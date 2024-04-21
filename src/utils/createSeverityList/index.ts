import { IOption } from "../../entities/IOption";

export const createSeverityList: ICreateSeverityListUtil = ({
  severityList,
  type,
  selectedSeverity,
}) => {
  if (selectedSeverity === "") return severityList;

  return severityList.filter((item) => {
    if (type === "current") {
      return Number(item.name) > Number(selectedSeverity);
    }

    return Number(item.name) < Number(selectedSeverity);
  });
};

interface IProps {
  severityList: IOption[];
  selectedSeverity: string;
  type: "current" | "target";
}
interface ICreateSeverityListUtil {
  (props: IProps): IOption[];
}
