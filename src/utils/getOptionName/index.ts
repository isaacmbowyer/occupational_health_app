import { IOption } from "../../entities/IOption";

export const getOptionName: IGetOptionNameUtil = (items, id) => {
  if (!items?.length) return "";

  const item = items.find((item) => item?.id === id);

  if (!item) return "";
  return item.name;
};

interface IGetOptionNameUtil {
  (items: IOption[], value: number): string;
}
