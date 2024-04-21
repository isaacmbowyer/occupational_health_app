import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { resourcesAdapter } from "../../utils/resourcesAdapter";
import { sliceData } from "../../utils/sliceData";

import { IResourceWithLikeResponse } from "../../entities/IResourceWithLikeResponse";
import { resourceWithLikeAdapter } from "../../utils/resourceWithLikeAdapter";
import { IOption } from "../../entities/IOption";
import { IResourceName } from "../../entities/IResourceName";

export const getFavouriteResources: IGetFavouriteResourcesService = async (
  props
) => {
  const collectionName = `${props.name}_resources`;
  const referenceId = props?.name === "symptom" ? "symptomId" : "categoryId";

  const resourcesRef = collection(db, collectionName);
  const likesRef = collection(db, "resource_likes");

  console.log("FETCHING FAVOURTIES...");
  let collectionQuery = query(resourcesRef, orderBy("createdAt"));

  if (props?.refId) {
    collectionQuery = query(
      resourcesRef,
      where(referenceId, "==", props?.refId),
      orderBy("createdAt")
    );
  }

  const totalSnapshot = await getDocs(collectionQuery);

  console.log(totalSnapshot.size);

  let resources = resourcesAdapter({
    userId: props?.userId,
    resourceDocs: totalSnapshot.docs,
  });

  console.log(resources);

  if (!props?.refId && props?.type?.name !== "All") {
    resources = resources.filter(
      (resource) => resource.typeId === props?.type?.id
    );
  }

  const resourceLikesPromises = resources?.map(async (doc) => {
    const { docs: likesDocs } = await getDocs(
      query(likesRef, where("resourceId", "==", doc?.id))
    );

    const foundDocument = likesDocs?.find(
      (doc) => doc?.data()?.userId === props?.userId
    );

    return resourceWithLikeAdapter({
      userId: props?.userId,
      resource: doc,
      likedResourceId: foundDocument?.id || "",
      numberOfLikes: likesDocs?.length || 0,
    });
  });

  const resourceLikes = await Promise.all(resourceLikesPromises);

  const filteredResources = resourceLikes.filter(
    (resource) => resource.isLiked
  );

  return {
    count: filteredResources.length,
    results: sliceData({
      data: filteredResources,
      skip: props.skip,
      limit: props.limit,
    }),
  };
};

interface IProps {
  skip: number;
  limit: number;
  userId: string;
  type: IOption;
  name: IResourceName;
  refId: string;
}

interface IGetFavouriteResourcesService {
  (props: IProps): Promise<IResourceWithLikeResponse>;
}
