import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const deleteSymptomResourcesLike: IDeleteSymptomResourcesLikeService =
  async (props) => {
    const docRef = doc(db, "symptom_resources_likes", props?.id);
    await deleteDoc(docRef);
  };

interface IPayload {
  id: string;
}

interface IDeleteSymptomResourcesLikeService {
  (props: IPayload): Promise<any>;
}
