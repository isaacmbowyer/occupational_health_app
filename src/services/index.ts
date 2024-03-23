import { postAuthLogin } from "./post-auth-login";
import { postAuthLogout } from "./post-auth-logout";

export const services = {
  post: {
    authLogin: postAuthLogin,
    authLogout: postAuthLogout,
  },
};
