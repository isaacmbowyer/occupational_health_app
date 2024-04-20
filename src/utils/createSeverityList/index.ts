import { IOption } from "../../entities/IOption";

export const createSeverityList: ICreateSeverityListUtil = ({
  severityList,
  type,
  selectedSeverity,
}) => {
  return severityList.filter((item) => {
    if (type === "current") {
      return Number(item.name) > Number(selectedSeverity.name);
    }

    return Number(item.name) < Number(selectedSeverity.name);
  });
};

interface IProps {
  severityList: IOption[];
  selectedSeverity: IOption;
  type: "current" | "target";
}
interface ICreateSeverityListUtil {
  (props: IProps): IOption[];
}
