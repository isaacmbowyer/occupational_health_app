import { services } from "..";
import { IOption } from "../../entities/IOption";
import { resourcesWithLikesAdapter } from "../../utils/resourceWithLikeAdapter";

export const compositionResources: ICompositionResourcesService = async (
  props
) => {
  if (props?.refId !== "favourites") {
    const resources = await services.get.resources({
      refId: props?.refId,
      userId: props?.userId,
      type: props?.type,
      limit: props?.limit,
      currentPage: props?.currentPage,
      name: props?.name,
    });

    const resourceWithLikes = await services.get.likes({
      resources: resources?.results,
      userId: props?.userId,
    });

    const formattedResources = resourcesWithLikesAdapter({
      resources: resources?.results,
      likes: likes,
      userId: props?.userId,
    });

    return {
      count: resources.count,
      results: formattedResources,
    };
  }

  const resources = await services.get.favouriteWorkResources({
    userId: props?.userId,
    skip: props?.skip,
    limit: props?.limit,
  });

  return {
    count: resources.count,
    results: resources,
  };
};

interface IPayload {
  refId: string;
  userId: string;
  type: IOption;
  limit: number;
  skip: number;
  currentPage: number;
  name: "work" | "symptom";
}

interface ICompositionResourcesService {
  (props: IPayload): Promise<any>;
}
