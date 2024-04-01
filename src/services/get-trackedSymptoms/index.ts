import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore/lite";
import { trackedSymptomsAdapter } from "../../utils/trackedSymptomsAdapter";
import { ITrackedSymptomsResponse } from "../../entities/ITrackedSymptomsResponse";

export const getTrackedSymptoms: IGetTrackedSymptomsService = async ({
  userId,
  skip,
  pageLimit,
}) => {
  const collectionRef = collection(db, "tracked_symptoms");

  // Get total document count
  const totalSnapshot = await getDocs(collectionRef);
  const totalDocuments = totalSnapshot.size;

  // Fetch documents for the requested query
  const collectionQuery = query(
    collectionRef,
    where("uid", "==", userId),
    orderBy("__createdAt__"),
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
  userId: number;
  skip: number;
  pageLimit: number;
}
