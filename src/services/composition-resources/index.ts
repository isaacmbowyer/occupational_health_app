import { services } from "..";
import { IOption } from "../../entities/IOption";

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

    return {
      count: resources.count,
      results: resourceWithLikes,
    };
  }

  const resources = await services.get.favouriteWorkResources({
    userId: props?.userId,
    skip: props?.skip,
    limit: props?.limit,
    type: props?.type,
  });

  return {
    count: resources.count,
    results: resources.results,
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
