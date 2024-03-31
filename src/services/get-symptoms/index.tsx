import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore/lite";

export const getSymptoms: IGetSymptomsService = async () => {
  const { docs } = await getDocs(collection(db, "symptoms"));
  console.log(docs);
  return docs;
};

interface IGetSymptomsService {
  (): Promise<any>;
}
