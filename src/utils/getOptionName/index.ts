import { IOption } from "../../entities/IOption";

export const getOptionName: IGetOptionNameUtil = (items, id) => {
  const item = items.find((item) => item.id === id);

  if (!item) return "";
  return item.name;
};

interface IGetOptionNameUtil {
  (items: IOption[], value: string): string;
}
