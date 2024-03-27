import { IOption } from "../../entities/IOption";

export const getLabelFromValue: IGetLabelFromValueUtil = (items, value) => {
  const item = items.find((item) => item.value === value);

  if (!item) return "";
  return item.label;
};

interface IGetLabelFromValueUtil {
  (items: IOption[], value: string): string;
}
