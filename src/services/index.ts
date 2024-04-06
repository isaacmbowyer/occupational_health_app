import { deleteSymptomId } from "./delete-symptom-id";
import { getSymptomIdResources } from "./get-symptom-id-resources";
import { getSymptomIdScores } from "./get-symptom-id-scores";
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
    symptomIdScores: getSymptomIdScores,
    symptomResources: getSymptomIdResources,
  },
  delete: {
    trackedSymptomId: deleteSymptomId,
  },
  update: {
    trackedSymptomId: updateSymptomId,
  },
};
