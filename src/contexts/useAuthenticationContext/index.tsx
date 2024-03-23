import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { ILoginData } from "../../entities/ILoginData";
import { services } from "../../services";
import { validateEmail } from "../../utils/validateEmail";
import { VALIDATION_ERRORS } from "../../data/errors";
import { validatePassword } from "../../utils/validatePassword";

const AuthenticationContext = createContext({});

const INITAL_STATE: IAuthenticationContextFormState = {
  email: "",
  password: "",
  isLoading: false,
};

export const AuthenticationContextProvider = ({ children }: IProviderProps) => {
  const [formState, setFormState] =
    useState<IAuthenticationContextFormState>(INITAL_STATE);
  const [user, setUser] = useState({} as any);

  // STATE METHODS
  const _handleSetLoading = (loadingState: boolean) => {
    setFormState((state) => ({ ...state, isLoading: loadingState }));
  };

  const handleSetLoginData = (data: ILoginData) => {
    setFormState((state) => ({
      ...state,
      email: data.email,
      password: data.password,
    }));
  };

  const handleResetState = () => {
    setFormState(INITAL_STATE);
    setUser({});
  };

  // ACTION METHODS
  const handleLogin = async () => {
    try {
      _handleSetLoading(true);

      const data = await services.post.authLogin({
        email: formState.email,
        password: formState.password,
      });

      handleSetLoginData({ email: "", password: "" });
      setUser(data.user);
    } catch (e: any) {
      console.log("error");
      handleResetState();
    } finally {
      _handleSetLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      _handleSetLoading(true);

      await services.post.authLogout();

      // RESET STATE
      handleResetState();
    } catch (error: any) {
      _handleSetLoading(false);
    }
  };

  const emailError = validateEmail(formState.email)
    ? ""
    : VALIDATION_ERRORS.EMAIL;
  const passwordError = validatePassword(formState.password)
    ? ""
    : VALIDATION_ERRORS.PASSWORD;

  const isDisabled = !!emailError || !!passwordError;

  return (
    <AuthenticationContext.Provider
      value={{
        state: {
          email: formState.email,
          password: formState.password,
          user: user,
          isLoading: formState.isLoading,
          isDisabled: isDisabled,
          emailError: emailError,
          passwordError: passwordError,
        },
        methods: {
          handleLogin: handleLogin,
          handleLogout: handleLogout,
          handleResetState: handleResetState,
        },
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};
