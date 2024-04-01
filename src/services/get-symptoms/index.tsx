import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { symptomsAdapter } from "../../utils/symptomsAdapter";
import { ISymptom } from "../../entities/ISymptom";

export const getSymptoms: IGetSymptomsService = async () => {
  const { docs } = await getDocs(collection(db, "symptoms"));

  return symptomsAdapter(docs);
};

interface IGetSymptomsService {
  (): Promise<ISymptom[]>;
}
