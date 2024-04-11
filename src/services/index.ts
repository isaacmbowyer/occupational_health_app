import { compositionSymptomResourcesLike } from "./composition-symptom-resources-like";
import { deleteSymptomResourceLike } from "./delete-resource-like";
import { deleteSymptomScores } from "./delete-symptom-scores";
import { deleteTrackedSymptom } from "./delete-tracked-symptom";
import { getResourceCategories } from "./get-resource-categories";
import { getResourceTypes } from "./get-resource-types";
import { getSymptomResources } from "./get-symptom-resources";
import { getSymptomScores } from "./get-symptom-scores";
import { getSymptoms } from "./get-symptoms";
import { getTrackedSymptoms } from "./get-tracked-symptoms";
import { getUsers } from "./get-users";
import { postAuthLogin } from "./post-auth-login";
import { postAuthLogout } from "./post-auth-logout";
import { postAuthRegistration } from "./post-auth-registration";
import { postSymptomResourceLike } from "./post-symptom-resource-like";
import { postSymptomScore } from "./post-symptom-score";
import { postTrackedSymptom } from "./post-tracked-symptom";
import { updateTrackedSymptom } from "./update-tracked-symptom";

export const services = {
  post: {
    authLogin: postAuthLogin,
    authLogout: postAuthLogout,
    authRegistration: postAuthRegistration,
    trackedSymptom: postTrackedSymptom,
    score: postSymptomScore,
    resourceLike: postSymptomResourceLike,
  },
  get: {
    symptoms: getSymptoms,
    trackedSymptoms: getTrackedSymptoms,
    scores: getSymptomScores,
    resources: getSymptomResources,
    users: getUsers,
    types: getResourceTypes,
    categories: getResourceCategories,
  },
  delete: {
    trackedSymptom: deleteTrackedSymptom,
    scores: deleteSymptomScores,
    resourceLike: deleteSymptomResourceLike,
  },
  update: {
    trackedSymptom: updateTrackedSymptom,
  },
  composition: {
    symptomResourceLike: compositionSymptomResourcesLike,
  },
};
