import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { resourcesAdapter } from "../../utils/resourcesAdapter";
import { sliceData } from "../../utils/sliceData";

import { IResourceWithLikeResponse } from "../../entities/IResourceWithLikeResponse";
import { resourceWithLikeAdapter } from "../../utils/resourceWithLikeAdapter";
import { IOption } from "../../entities/IOption";

export const getFavouriteWorkResources: IGetFavouriteWorkResourcesService =
  async (props) => {
    const resourcesRef = collection(db, "work_resources");
    const likesRef = collection(db, "resource_likes");

    const collectionQuery = query(resourcesRef, orderBy("createdAt"));

    const totalSnapshot = await getDocs(collectionQuery);

    let resources = resourcesAdapter({
      userId: props?.userId,
      resourceDocs: totalSnapshot.docs,
    });

    console.log("TYPE", props?.type?.name);
    if (props?.type?.name !== "All") {
      console.log("TYPE: INSIDE", props?.type?.name);
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
}

interface IGetFavouriteWorkResourcesService {
  (props: IProps): Promise<IResourceWithLikeResponse>;
}
