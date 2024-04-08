import { doc, deleteDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const updateSymptomIdResource: IUpdateSymptomIdResourceService = async (
  props
) => {
  if (props?.id) {
    // Delete it as it is been liked
    const docRef = doc(db, "symptom_resources_likes", props?.id);
    return await deleteDoc(docRef);
  }

  // Add it as it has not been liked
  const collectionRef = collection(db, "symptom_resources_likes");

  return await addDoc(collectionRef, {
    createdAt: new Date(),
    resourceId: props?.resourceId,
    userId: props?.userId,
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
