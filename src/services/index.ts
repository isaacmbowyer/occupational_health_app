import { postAuthLogin } from "./post-auth-login";
import { postAuthLogout } from "./post-auth-logout";
import { postAuthRegistration } from "./post-auth-registration";

export const services = {
  post: {
    authLogin: postAuthLogin,
    authLogout: postAuthLogout,
    authRegistration: postAuthRegistration,
  },
};
