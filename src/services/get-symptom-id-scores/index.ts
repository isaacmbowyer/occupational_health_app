import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ISymptomScore } from "../../entities/ISymptomScore";
import { db } from "../../config/firebase";
import { symptomIdScoresAdapter } from "../../utils/symptomIdScoresAdapter";
import { IUserIdWithSymptomId } from "../../entities/IUserIdWithSymptomId";

export const getSymptomIdScores: IGetSymptomIdScoresService = async (props) => {
  const collectionRef = collection(db, "scores");

  const fourMonthsAgo = new Date();
  fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 3);

  // Adjust the year if the current month is less than 4
  if (fourMonthsAgo.getMonth() > new Date().getMonth()) {
    fourMonthsAgo.setFullYear(fourMonthsAgo.getFullYear() - 1);
  }

  const collectionQuery = query(
    collectionRef,
    where("createdAt", ">", fourMonthsAgo), // Only include entries from the last four months
    where("userId", "==", props?.userId),
    where("symptomId", "==", props?.symptomId),
    orderBy("createdAt")
  );

  const { docs } = await getDocs(collectionQuery);

  console.log(docs.length);

  return symptomIdScoresAdapter(docs);
};

interface IGetSymptomIdScoresService {
  (payload: IUserIdWithSymptomId): Promise<ISymptomScore[]>;
}
