const EMAIL_ERROR =
  "The email address you provided is invalid. Please enter a valid email address.";
const PASSWORD_ERROR =
  "Your password must be at least 12 characters long, and include a lower case letter (a-z), an upper case letter (A-Z), a digit (0-9) and a symbol (e.g. @).";
const PASSWORD_CONFIRM_ERROR =
  "The passwords you entered do not match. Please enter the same password in both fields.";

export const VALIDATION_ERRORS = {
  EMAIL: EMAIL_ERROR,
  PASSWORD: PASSWORD_ERROR,
  PASSWORD_CONFIRM: PASSWORD_CONFIRM_ERROR,
};
