import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const deleteSymptomId: IDeleteSymptomIdService = async ({ id }) => {
  const docRef = doc(db, "tracked_symptoms", id);

  await deleteDoc(docRef);
};

interface IPayload {
  id: string;
}

interface IDeleteSymptomIdService {
  (props: IPayload): Promise<any>;
}
