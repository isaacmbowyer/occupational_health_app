import { ISeverityType } from "./ISeverityType";
import { ITrackedSymptom } from "./ITrackedSymptom";

export interface IUserSymptom extends ITrackedSymptom {
  image: string;
  name: string;
  severityType: ISeverityType;
}
