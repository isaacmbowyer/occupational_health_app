import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";

export const trackedSymptomsAdapter: ITrackedSymptomsAdapter = (docs) => {
  const symptoms = docs?.map((doc) => {
    const data = doc?.data();

    return {
      id: doc?.id,
      targetSeverity: data?.targetDate,
      targetDate: new Date(data?.targetDate),
      createdAt: new Date(data?.createdAt),
    };
  });

  return symptoms;
};

interface ITrackedSymptomsAdapter {
  (
    docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]
  ): ITrackedSymptom[];
}
