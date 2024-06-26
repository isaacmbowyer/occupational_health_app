export const validatePassword: IValidatePasswordUtil = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*;?&])[A-Za-z\d$@$!%*;?&]{8,}$/;
  return regex.test(password);
};

interface IValidatePasswordUtil {
  (password: string): boolean;
}
