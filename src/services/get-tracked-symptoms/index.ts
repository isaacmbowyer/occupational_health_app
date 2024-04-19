import { trackedSymptomsAdapter } from "../../utils/trackedSymptomsAdapter";
import { ITrackedSymptomsResponse } from "../../entities/ITrackedSymptomsResponse";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { ISymptom } from "../../entities/ISymptom";
import { searchSymptomsAdapter } from "../../utils/searchSymptomsAdapter";
import { formatDate } from "../../utils/formatDate";

export const getTrackedSymptoms: IGetTrackedSymptomsService = async (props) => {
  const collectionRef = collection(db, "tracked_symptoms");
  const sign = props?.source === "current" ? ">" : "<";

  let totalDocuments;
  let collectionQuery;
  let resourceSnapshot;

  if (props?.source !== "all") {
    collectionQuery = query(
      collectionRef,
      where("userId", "==", props?.userId),
      where("targetDate", sign, new Date()),
      orderBy("createdAt")
    );

    const totalSnapshot = await getDocs(collectionQuery);
    totalDocuments = totalSnapshot.size;

    if (props?.config?.length) {
      const symptoms = searchSymptomsAdapter(
        totalSnapshot.docs,
        props?.symptomList
      );

      let filteredSymptoms = symptoms;
      props?.config?.forEach((item) => {
        filteredSymptoms = filteredSymptoms?.filter((symptom) => {
          if (item.name == "targetDate") {
            return formatDate(symptom.targetDate) === formatDate(item.value);
          }

          if (item.name === "name") {
            const searchValue = item.value.toLowerCase();
            return symptom.name.includes(searchValue);
          }

          return item.value === symptom[item.name];
        });
      });

      totalDocuments = filteredSymptoms.length;

      return {
        count: totalDocuments,
        results: filteredSymptoms.slice(
          props?.skip,
          props?.skip + props?.limit
        ),
      };
    } else {
      collectionQuery = query(
        collectionRef,
        where("userId", "==", props?.userId),
        where("targetDate", sign, new Date()),
        orderBy("createdAt"),
        limit(props?.limit)
      );

      resourceSnapshot = await getDocs(collectionQuery);

      if (props?.currentPage > 1) {
        const lastVisible =
          resourceSnapshot.docs[resourceSnapshot.docs?.length - 1];

        collectionQuery = query(
          collectionRef,
          where("userId", "==", props?.userId),
          where("targetDate", sign, new Date()),
          orderBy("createdAt"),
          startAfter(lastVisible),
          limit(props?.limit)
        );

        resourceSnapshot = await getDocs(collectionQuery);
      }
    }
  } else {
    collectionQuery = query(
      collectionRef,
      where("userId", "==", props?.userId)
    );

    resourceSnapshot = await getDocs(collectionQuery);
    totalDocuments = resourceSnapshot.size;
  }

  return {
    count: totalDocuments,
    results: trackedSymptomsAdapter(resourceSnapshot.docs),
  };
};

interface IGetTrackedSymptomsService {
  (props: IPayload): Promise<ITrackedSymptomsResponse>;
}

interface IPayload {
  config: any[];
  symptomList: ISymptom[];
  userId: string;
  currentPage: number;
  source: string;
  skip: number;
  limit: number;
}
