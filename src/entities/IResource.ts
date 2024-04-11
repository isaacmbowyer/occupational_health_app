import { IResourceCategory } from "./IResourceCategory";
import { IResourceType } from "./IResourceType";

export interface IResource {
  id: string;
  symptomId: string;
  link: string;
  logoUri: string;
  details: string;
  type: IResourceType;
  companyName: string;
  companyDetails: string;
  isLiked: boolean;
  likedId: string;
  numberOfLikes: number;
  category: IResourceCategory;
}
