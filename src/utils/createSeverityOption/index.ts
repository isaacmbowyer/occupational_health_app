import { IOption } from "../../entities/IOption";

export const createSeverityOption: ICreateSeverityOptionUtil = (
  items,
  value
) => {
  return items?.find((item) => item.name === value);
};

interface ICreateSeverityOptionUtil {
  (items: IOption[], value: string): IOption;
}
