import { IResourceType } from "./IResourceType";

export interface IResource {
  id: string;
  symptomId: string;
  link: string;
  logoUri: string;
  details: string;
  type: IResourceType;
  companyName: string;
  isLiked: boolean;
  numberOfLikes: number;
}
