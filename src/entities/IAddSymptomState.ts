import { IOption } from "./IOption";
import { ISymptom } from "./ISymptom";

export interface IAddSymptomState {
  selectedSymptom: ISymptom;
  currentSeverity: IOption;
  targetSeverity: IOption;
  targetDate: Date;
  search: string;
  isLoading: boolean;
  filteredSymptoms: ISymptom[];
}
