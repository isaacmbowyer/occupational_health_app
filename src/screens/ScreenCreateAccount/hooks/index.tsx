import { useState } from "react";
import { useCountries } from "../../../hooks/useCountries";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { useGenders } from "../../../hooks/useGenders";
import { useIndustries } from "../../../hooks/useIndustries";
import { ICreateAccountState } from "../../../entities/ICreateAccountState";
import { validateText } from "../../../utils/validateText";
import { VALIDATION_ERRORS } from "../../../data/errors";
import { validateEmail } from "../../../utils/validateEmail";
import { validatePassword } from "../../../utils/validatePassword";
import { compareValues } from "../../../utils/compareValues";
import { ICreateAccountValidationError } from "../../../entities/ICreateAccountValidationError";
import { validateCreateAccountState } from "../../../utils/validateCreateAccountState";

const INITAL_STATE: ICreateAccountState = {
  isLoading: false,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  country: 0,
  industry: 0,
  gender: 0,
  birthDate: null,
};

export const useCreateAccount = () => {
  const industries = useIndustries();
  const countries = useCountries();
  const genders = useGenders();
  const toast = useCustomToast();

  const [formState, setFormState] = useState<ICreateAccountState>(INITAL_STATE);

  // STATE METHODS
  const _handleLoading = (boolean: boolean) => {
    setFormState((prev) => ({ ...prev, isLoading: boolean }));
  };

  const handleOnChange = (
    key: ICreateAccountStateKey,
    value: ICreateAccountStateKeyValue
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    console.log("submit");
  };

  const validationError: ICreateAccountValidationError = {
    firstName: validateText(formState.firstName) ? "" : VALIDATION_ERRORS.NAME,
    lastName: validateText(formState.lastName) ? "" : VALIDATION_ERRORS.NAME,
    email: validateEmail(formState.email) ? "" : VALIDATION_ERRORS.EMAIL,
    password: validatePassword(formState.password)
      ? ""
      : VALIDATION_ERRORS.PASSWORD,
    confirmPassword: compareValues(
      formState.password,
      formState.confirmPassword
    )
      ? ""
      : VALIDATION_ERRORS.PASSWORD_CONFIRM,
    companyName: validateText(formState.companyName)
      ? ""
      : VALIDATION_ERRORS.NAME,
  };

  const isDisabled = validateCreateAccountState({
    validationError: validationError,
    industry: formState.industry,
    country: formState.country,
    gender: formState.gender,
    dateOfBirth: formState.birthDate,
  });

  return {
    state: {
      isDisabled: isDisabled,
      validationError: validationError,
      industryOptions: industries,
      countryOptions: countries,
      genderOptions: genders,
      values: formState,
    },
    methods: {
      handleOnChange: handleOnChange,
      handleSubmit: handleSubmit,
    },
  };
};

export type ICreateAccountStateKey = keyof ICreateAccountState;
export type ICreateAccountStateKeyValue = string | number | Date;
