import { IOption } from "./IOption";

export interface ISourcePageProps {
  limit?: number;
  skip?: number;
  source?: IOption;
  currentPage?: number;
}
