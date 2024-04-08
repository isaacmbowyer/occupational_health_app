import { IOption } from "./IOption";

export interface ISymptomGoalState {
  targetSeverity: IOption;
  targetDate: Date;
  currentPage: number;
  isLoading: boolean;
  source: string;
}
