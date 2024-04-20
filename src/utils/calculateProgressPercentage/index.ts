export const calculateProgressPercentage: ICalculateProgresPercentageIUtil = ({
  currentSeverity,
  targetSeverity,
}) => {
  if (currentSeverity <= targetSeverity) return 100;

  return ((currentSeverity - targetSeverity) / currentSeverity) * 100;
};

interface IPayload {
  currentSeverity: number;
  targetSeverity: number;
}
interface ICalculateProgresPercentageIUtil {
  (props: IPayload): number;
}
