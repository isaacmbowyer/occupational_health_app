import { IAdvancedSearch } from "../../entities/IAdvancedSearch";
import { ISymptom } from "../../entities/ISymptom";

export const createSearchConfig: ICreateSearchConfigUtil = ({
  isSearchActive,
  search,
  symptoms,
}) => {
  let conditions = [];

  if (!isSearchActive) return conditions;

  // Construct the conditions based on provided criteria
  if (search?.currentRating?.name) {
    conditions.push({
      name: "currentSeverity",
      value: Number(search?.currentRating?.name),
    });
  }

  if (search.targetRating?.name) {
    conditions.push({
      name: "targetSeverity",
      value: Number(search?.targetRating?.name),
    });
  }

  if (search.severityType?.name) {
    conditions.push({
      name: "severityType",
      value: search?.severityType?.name,
    });
  }

  if (search.symptom) {
    conditions.push({
      name: "name",
      value: search.symptom,
    });
  }

  if (search.targetDate) {
    conditions.push({ name: "targetDate", value: search.targetDate });
  }

  return conditions;
};

interface IProps {
  isSearchActive: boolean;
  search: IAdvancedSearch;
  symptoms: ISymptom[];
}
interface ICreateSearchConfigUtil {
  (props: IProps): any[];
}
