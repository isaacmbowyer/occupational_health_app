import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { resourcesAdapter } from "../../utils/resourcesAdapter";
import { sliceData } from "../../utils/sliceData";

import { IResourceWithLikeResponse } from "../../entities/IResourceWithLikeResponse";
import { IResourceWithLike } from "../../entities/IResourceWithLike";
import { resourceWithLikeAdapter } from "../../utils/resourceWithLikeAdapter";

export const getFavouriteWorkResources: IGetFavouriteWorkResourcesService =
  async (props) => {
    const resourcesRef = collection(db, "work_resources");
    const likesRef = collection(db, "resource_likes");

    const collectionQuery = query(resourcesRef, orderBy("createdAt"));

    const totalSnapshot = await getDocs(collectionQuery);

    const resources = resourcesAdapter({
      userId: props?.userId,
      resourceDocs: totalSnapshot.docs,
    });

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
}

interface IGetFavouriteWorkResourcesService {
  (props: IProps): Promise<IResourceWithLikeResponse>;
}
