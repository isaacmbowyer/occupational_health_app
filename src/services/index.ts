import { deleteSymptomId } from "./delete-symptom-id";
import { getSymptoms } from "./get-symptoms";
import { getTrackedSymptoms } from "./get-trackedSymptoms";
import { postAuthLogin } from "./post-auth-login";
import { postAuthLogout } from "./post-auth-logout";
import { postAuthRegistration } from "./post-auth-registration";
import { updateSymptomId } from "./update-symptom-id";

export const services = {
  post: {
    authLogin: postAuthLogin,
    authLogout: postAuthLogout,
    authRegistration: postAuthRegistration,
  },
  get: {
    symptoms: getSymptoms,
    trackedSymptoms: getTrackedSymptoms,
  },
  delete: {
    trackedSymptomId: deleteSymptomId,
  },
  update: {
    trackedSymptomId: updateSymptomId,
  },
};
