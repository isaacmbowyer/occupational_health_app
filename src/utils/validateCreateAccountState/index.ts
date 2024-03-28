import { ICreateAccountValidationError } from "../../entities/ICreateAccountValidationError";

export const validateCreateAccountState: IValidateCreateAccountStateUtil = ({
  validationError,
  industry,
  gender,
  country,
  dateOfBirth,
}) => {
  return (
    Object.values(validationError).some((field) => field !== "") ||
    !industry ||
    !gender ||
    !country ||
    !dateOfBirth
  );
};

interface IProps {
  validationError: ICreateAccountValidationError;
  industry: number;
  gender: number;
  country: number;
  dateOfBirth: Date;
}

interface IValidateCreateAccountStateUtil {
  (props: IProps): boolean;
}
