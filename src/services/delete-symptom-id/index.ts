import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const deleteSymptomId: IDeleteSymptomIdService = async ({ id }) => {
  await deleteDoc(doc(db, "tracked_symptoms", id));
};

interface IPayload {
  id: string;
}

interface IDeleteSymptomIdService {
  (props: IPayload): Promise<void>;
}
