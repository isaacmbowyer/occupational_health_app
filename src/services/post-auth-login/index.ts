import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export const postAuthLogin: IPostAuthLoginService = async (payload) => {
  const data = await signInWithEmailAndPassword(
    auth,
    payload.email,
    payload.password
  );

  return data;
};

interface IPostAuthLoginService {
  (payload: IPayload): Promise<any>;
}

interface IPayload {
  email: string;
  password: string;
}
