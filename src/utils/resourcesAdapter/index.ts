import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { IResource } from "../../entities/IResource";
import { IResourceLike } from "../../entities/IResourceLike";

export const resorcesAdapter: IResourcesAdapter = (props) => {
  const resources: IResource[] = props?.resourceDocs?.map((doc) => {
    const data = doc?.data();

    const resourceLike = props?.likes?.find(
      (item) => item?.resourceId === doc?.id
    );

    const createdAtTimestamp: Timestamp = data?.createdAt;

    return {
      id: doc?.id,
      symptomId: data?.symptomId,
      typeId: data?.typeId,
      link: data?.link,
      information: data?.information,
      companyName: data?.companyName,
      companyDetails: data?.companyDetails,
      companyLogo: data?.companyLogo,
      createdAt: createdAtTimestamp?.toDate(),
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
