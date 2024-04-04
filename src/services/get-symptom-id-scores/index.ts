import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { ISymptomScore } from "../../entities/ISymptomScore";
import { db } from "../../config/firebase";
import { symptomIdScoresAdapter } from "../../utils/symptomIdScoresAdapter";
import { IUserIdWithSymptomId } from "../../entities/IUserIdWithSymptomId";

export const getSymptomIdScores: IGetSymptomIdScoresService = async (props) => {
  const collectionRef = collection(db, "scores");

  const collectionQuery = query(
    collectionRef,
    where("userId", "==", props?.userId),
    where("symptomId", "==", props?.symptomId),
    orderBy("createdAt")
  );

  const { docs } = await getDocs(collectionQuery);

  return symptomIdScoresAdapter(docs);
};

interface IGetSymptomIdScoresService {
  (payload: IUserIdWithSymptomId): Promise<ISymptomScore[]>;
}
