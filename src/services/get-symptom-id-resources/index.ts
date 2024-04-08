import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
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

  if (props?.source !== "All") {
    collectionQuery = query(
      resourcesRef,
      where("symptomId", "==", props?.symptomId),
      where("type", "==", props?.source)
    );
  }

  const totalSnapshot = await getDocs(collectionQuery);
  const totalResources = totalSnapshot.size;

  collectionQuery = query(
    resourcesRef,
    where("symptomId", "==", props?.symptomId),
    orderBy("createdAt"),
    limit(props?.limit)
  );

  if (props?.source !== "All") {
    collectionQuery = query(
      resourcesRef,
      where("symptomId", "==", props?.symptomId),
      where("type", "==", props?.source),
      orderBy("createdAt"),
      limit(props?.limit)
    );
  }

  let resourceSnapshot = await getDocs(collectionQuery);

  console.log("snap", resourceSnapshot);
  console.log("props", props?.currentPage, props?.source);

  if (props?.currentPage > 1) {
    const lastVisible =
      resourceSnapshot.docs[resourceSnapshot.docs?.length - 1];

    if (props?.source === "All")
      collectionQuery = query(
        resourcesRef,
        where("symptomId", "==", props?.symptomId),
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(props?.limit)
      );
    else {
      collectionQuery = query(
        resourcesRef,
        where("symptomId", "==", props?.symptomId),
        where("type", "==", props?.source),
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(props?.limit)
      );
    }

    resourceSnapshot = await getDocs(collectionQuery);
  }

  try {
    const resourceLikesPromises = resourceSnapshot.docs?.map(async (doc) => {
      const { docs: likesDocs } = await getDocs(
        query(likesRef, where("resourceId", "==", doc?.id))
      );

      const foundDocument = likesDocs?.find(
        (doc) => doc?.data()?.userId === props?.userId
      );

      const isLiked = !!foundDocument;

      return {
        resourceId: doc?.id,
        numberOfLikes: likesDocs?.length || 0,
        isLiked: isLiked,
        likedId: isLiked ? foundDocument?.id : "",
      };
    });

    const resourceLikes = await Promise.all(resourceLikesPromises);

    console.log(
      resorcesAdapter({
        userId: props?.userId,
        resourceDocs: resourceSnapshot.docs,
        likes: resourceLikes,
      })
    );

    return {
      count: totalResources,
      results: resorcesAdapter({
        userId: props?.userId,
        resourceDocs: resourceSnapshot.docs,
        likes: resourceLikes,
      }),
    };
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

interface IPayload {
  symptomId: string;
  userId: string;
  source: string;
  limit: number;
  currentPage: number;
}

interface IGetSymptomIdResourcesService {
  (props: IPayload): Promise<IResourceResponse>;
}
