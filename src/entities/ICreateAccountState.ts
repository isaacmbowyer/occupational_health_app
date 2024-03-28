export interface ICreateAccountState {
  isLoading: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  country: number;
  industry: number;
  gender: number;
  birthDate: Date;
}
