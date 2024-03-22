import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { ILoginData } from "../../entities/ILoginData";
import { services } from "../../services";

const AuthenticationContext = createContext({});

const INITAL_STATE: IAuthenticationContextFormState = {
  email: "",
  password: "",
  isLoading: false,
};

export const AuthenticationProvider = ({ children }: IProviderProps) => {
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
};

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};
