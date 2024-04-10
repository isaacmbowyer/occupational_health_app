import { services } from "..";

export const compositionSymptomResourcesLike: IUpdateSymptomIdResourceService =
  async (props) => {
    if (props?.id) {
      await services.delete.resourceLike({
        id: props?.id,
      });
    }

    await services.post.resourceLike({
      userId: props?.userId,
      resourceId: props?.resourceId,
    });
  };

interface IPayload {
  id: string;
  resourceId: string;
  userId: string;
}

interface IUpdateSymptomIdResourceService {
  (props: IPayload): Promise<any>;
}
