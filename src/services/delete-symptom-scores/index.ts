import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const deleteSymptomScores: IDeleteSymptomScoresService = async ({
  userId,
  symptomId,
}) => {
  const collectionQuery = query(
    collection(db, "scores"),
    where("userId", "==", userId),
    where("symptomId", "==", symptomId)
  );

  const { docs } = await getDocs(collectionQuery);

  docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

interface IPayload {
  userId: string;
  symptomId: string;
}

interface IDeleteSymptomScoresService {
  (props: IPayload): Promise<any>;
}
