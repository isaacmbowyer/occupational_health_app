import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const deleteSymptomId: IDeleteSymptomIdService = async (id) => {
  const docRef = doc(db, "tracked_symptoms", id);

  await deleteDoc(docRef);
};

interface IDeleteSymptomIdService {
  (id: string): Promise<any>;
}
