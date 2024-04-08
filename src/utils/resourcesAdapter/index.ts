import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IResource } from "../../entities/IResource";
import { IResourceLike } from "../../entities/IResourceLike";

export const resorcesAdapter: IResourcesAdapter = (props) => {
  const resources: IResource[] = props?.resourceDocs?.map((doc) => {
    const data = doc?.data();

    const resourceLike = props?.likes?.find(
      (item) => item?.resourceId === doc?.id
    );

    return {
      id: doc?.id,
      symptomId: data?.symptomId,
      link: data?.link,
      logoUri: data?.logo,
      details: data?.information,
      type: data?.type,
      companyName: data?.company,
      companyDetails: data?.companyDetails,
      numberOfLikes: resourceLike?.numberOfLikes,
      isLiked: resourceLike?.isLiked,
      likedId: resourceLike?.likedId,
    };
  });

  return resources;
};

interface IPayload {
  userId: string;
  resourceDocs: QueryDocumentSnapshot<DocumentData, DocumentData>[];
  likes: IResourceLike[];
}
interface IResourcesAdapter {
  (props: IPayload): IResource[];
}
