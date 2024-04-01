export interface ITrackedSymptom {
  id: string;
  symptomId: string;
  targetDate: Date;
  createdAt: Date;
  targetSeverity: number;
  currentSeverity: number;
}
