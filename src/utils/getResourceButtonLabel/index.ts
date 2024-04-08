import { IResourceType } from "../../entities/IResourceType";

export const getResourceButtonLabel = (resourceType) => {
  if (resourceType === "Website") return "Go To Website";

  return "Watch Video";
};

interface IGetResourceButtonLabelUtil {
  (resourceType: IResourceType): string;
}
