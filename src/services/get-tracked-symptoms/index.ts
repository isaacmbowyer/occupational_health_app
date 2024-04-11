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
import { IOption } from "../../entities/IOption";

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

  let collectionQuery;

  if (source?.name === "current") {
    // Retrieve future dates (after today)
    collectionQuery = query(
      collectionRef,
      where("userId", "==", userId),
      where("targetDate", ">", new Date()),
      orderBy("createdAt"),
      startAt(skip),
      limit(pageLimit)
    );
  } else if (source?.name === "past") {
    // Retrieve past dates (before today)
    collectionQuery = query(
      collectionRef,
      where("userId", "==", userId),
      where("targetDate", "<", new Date()),
      orderBy("createdAt"),
      startAt(skip),
      limit(pageLimit)
    );
  } else {
    // Retrieve all documents
    collectionQuery = query(
      collectionRef,
      where("userId", "==", userId),
      orderBy("createdAt")
    );
  }

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
  source: IOption;
}
