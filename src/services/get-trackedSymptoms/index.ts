import { trackedSymptomsAdapter } from "../../utils/trackedSymptomsAdapter";
import { ITrackedSymptomsResponse } from "../../entities/ITrackedSymptomsResponse";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const getTrackedSymptoms: IGetTrackedSymptomsService = async ({
  userId,
  skip,
  pageLimit,
  source,
}) => {
  const collectionRef = collection(db, "tracked_symptoms");

  // Get total document count
  const totalSnapshot = await getDocs(collectionRef);
  const totalDocuments = totalSnapshot.size;

  let dateCriteria;

  if (source === "current") {
    // Retrieve future dates (after today)
    dateCriteria = where("targetDate", ">", new Date());
  } else if (source === "past") {
    // Retrieve past dates (before today)
    dateCriteria = where("targetDate", "<", new Date());
  }

  // Fetch documents for the requested query
  const collectionQuery = query(
    collectionRef,
    where("userId", "==", userId),
    dateCriteria,
    orderBy("createdAt"),
    startAt(skip),
    limit(pageLimit)
  );

  const { docs } = await getDocs(collectionQuery);

  return {
    count: totalDocuments,
    results: trackedSymptomsAdapter(docs),
  };
};

interface IGetTrackedSymptomsService {
  (props: IPayload): Promise<ITrackedSymptomsResponse>;
}

interface IPayload {
  userId: string;
  skip: number;
  pageLimit: number;
  source: string;
}
