import { IOption } from "../../entities/IOption";

export const createSeverityList: ICreateSeverityListUtil = ({
  severityList,
  type,
  selectedSeverity,
}) => {
  const severity = Number(selectedSeverity.name);

  if (!severity) return severityList;

  return severityList.filter((item) => {
    if (type === "current") {
      return Number(item.name) > severity;
    }

    return Number(item.name) < severity;
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
