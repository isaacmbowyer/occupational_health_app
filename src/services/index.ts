import { deleteSymptomId } from "./delete-symptom-id";
import { deleteSymptomScores } from "./delete-symptom-scores";
import { getSymptomIdResources } from "./get-symptom-id-resources";
import { getSymptomIdScores } from "./get-symptom-id-scores";
import { getSymptoms } from "./get-symptoms";
import { getTrackedSymptoms } from "./get-trackedSymptoms";
import { getUsers } from "./get-users";
import { postAuthLogin } from "./post-auth-login";
import { postAuthLogout } from "./post-auth-logout";
import { postAuthRegistration } from "./post-auth-registration";
import { postSymptom } from "./post-symptom";
import { updateSymptomId } from "./update-symptom-id";
import { updateSymptomIdResource } from "./update-symptom-id-resources";

export const services = {
  post: {
    authLogin: postAuthLogin,
    authLogout: postAuthLogout,
    authRegistration: postAuthRegistration,
    symptom: postSymptom,
  },
  get: {
    symptoms: getSymptoms,
    trackedSymptoms: getTrackedSymptoms,
    symptomIdScores: getSymptomIdScores,
    symptomResources: getSymptomIdResources,
    users: getUsers,
  },
  delete: {
    trackedSymptomId: deleteSymptomId,
    symptomScores: deleteSymptomScores,
  },
  update: {
    trackedSymptomId: updateSymptomId,
    symptomResourceId: updateSymptomIdResource,
  },
};
