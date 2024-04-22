import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../config/firebase";

WebBrowser.maybeCompleteAuthSession();

export const postAuthGoogleLogin = async () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "505025586969-242f4eik71bnn7f4bdkcn0ev6tcn2gvc.apps.googleusercontent.com",
    iosClientId: "",
  });

  if (response.type === "success") {
    const { id_token } = response.params;
    const credential = GoogleAuthProvider.credential(id_token);
    await signInWithCredential(auth, credential);
  }
};
