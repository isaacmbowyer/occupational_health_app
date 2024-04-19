import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";
import { Timestamp } from "firebase/firestore";
import { ISymptom } from "../../entities/ISymptom";
import { findOption } from "../findOption";
import { getSeverityType } from "../getSeverityType";

export const searchSymptomsAdapter: ISearchSymptomsAdapter = (
  docs,
  symptomList
) => {
  const symptoms = docs?.map((doc) => {
    const data = doc?.data();

    const targetTimestamp: Timestamp = data?.targetDate;
    const createdAtTimestamp: Timestamp = data?.createdAt;

    return {
      id: doc?.id,
      symptomId: data?.symptomId,
      userId: data?.userId,
      name: findOption(symptomList, "id", data?.symptomId)?.name,
      currentSeverity: data?.currentSeverity,
      targetSeverity: data?.targetSeverity,
      severityType: getSeverityType(data.currentSeverity),
      targetDate: targetTimestamp?.toDate(),
      createdAt: createdAtTimestamp?.toDate(),
    };
  });

  return symptoms;
};

interface ISearchSymptomsAdapter {
  (
    docs: QueryDocumentSnapshot<DocumentData, DocumentData>[],
    symptomList: ISymptom[]
  ): ITrackedSymptom[];
}
