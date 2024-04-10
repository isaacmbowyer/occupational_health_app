import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IOption } from "../../entities/IOption";

export const postSymptomProgress: IPostSymptomProgressService = async (
  props
) => {
  await addDoc(collection(db, "scores"), {
    userId: props?.userId,
    symptomId: props?.symptomId,
    createdAt: new Date(),
    currentSeverity: props?.currentSeverity?.name,
    comment: props?.comment,
  });
};

interface IPayload {
  userId: string;
  symptomId: string;
  currentSeverity: IOption;
  comment: string;
}

interface IPostSymptomProgressService {
  (props: IPayload): Promise<any>;
}
