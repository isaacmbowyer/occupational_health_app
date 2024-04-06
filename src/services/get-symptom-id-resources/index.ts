import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { resorcesAdapter } from "../../utils/resourcesAdapter";
import { IResourceResponse } from "../../entities/IResourceResponse";

export const getSymptomIdResources: IGetSymptomIdResourcesService = async (
  props
) => {
  const resourcesRef = collection(db, "symptom_resources");
  const likesRef = collection(db, "symptom_resources_likes");

  let collectionQuery = query(
    resourcesRef,
    where("symptomId", "==", props?.symptomId)
  );

  const totalSnapshot = await getDocs(collectionQuery);
  const totalResources = totalSnapshot.size;

  collectionQuery = query(
    resourcesRef,
    where("symptomId", "==", props?.symptomId),
    orderBy("createdAt"),
    startAt(props?.skip),
    limit(props?.pageLimit)
  );

  if (props?.source !== "All") {
    collectionQuery = query(
      resourcesRef,
      where("symptomId", "==", props?.symptomId),
      where("type", "==", props?.source),
      orderBy("createdAt"),
      startAt(props?.skip),
      limit(props?.pageLimit)
    );
  }

  const { docs: resourceDocs } = await getDocs(collectionQuery);

  try {
    const resourceLikesPromises = resourceDocs?.map(async (doc) => {
      const { docs: likesDocs } = await getDocs(
        query(likesRef, where("resourceId", "==", doc?.id))
      );

      const isLiked = likesDocs?.find(
        (doc) => doc?.data()?.userId === props?.userId
      );

      return {
        resourceId: doc?.id,
        numberOfLikes: likesDocs?.length || 0,
        isLiked: !!isLiked,
      };
    });

    const resourceLikes = await Promise.all(resourceLikesPromises);

    return {
      count: totalResources,
      results: resorcesAdapter({
        userId: props?.userId,
        resourceDocs: resourceDocs,
        likes: resourceLikes,
      }),
    };
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    throw new Error("Error fetching data");
  }
};

interface IPayload {
  symptomId: string;
  userId: string;
  source: string;
  skip: number;
  pageLimit: number;
}

interface IGetSymptomIdResourcesService {
  (props: IPayload): Promise<IResourceResponse>;
}
