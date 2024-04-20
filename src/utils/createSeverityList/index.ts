import { IOption } from "../../entities/IOption";

export const createSeverityList: ICreateSeverityListUtil = ({
  severityList,
  type,
  selectedSeverity,
}) => {
  return severityList.filter((item) => {
    if (type === "current") {
      return Number(item.name) > selectedSeverity;
    }

    return Number(item.name) < selectedSeverity;
  });
};

interface IProps {
  severityList: IOption[];
  selectedSeverity: number;
  type: "current" | "target";
}
interface ICreateSeverityListUtil {
  (props: IProps): IOption[];
}
