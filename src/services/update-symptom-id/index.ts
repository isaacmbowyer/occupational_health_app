import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IOption } from "../../entities/IOption";

export const updateSymptomId: IUpdateSymptomIdService = async (props) => {
  const docRef = doc(db, "tracked_symptoms", props?.id);

  await updateDoc(docRef, {
    ["currentSeverity"]: Number(props?.currentSeverity),
    ["targetSeverity"]: Number(props?.targetSeverity),
    ["targetDate"]: props?.targetDate,
  });
};

interface IPayload {
  id: string;
  currentSeverity: number;
  targetSeverity: number;
  targetDate: Date;
}

interface IUpdateSymptomIdService {
  (props: IPayload): Promise<any>;
}
