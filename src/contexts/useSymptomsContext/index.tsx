import { createContext, useContext } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services";
import { auth } from "../../config/firebase";

const SymptomsContext = createContext({} as any);

export const SymptomsProvider = ({ children }: IProviderProps) => {
  const toast = useCustomToast();

  const { data, isFetching, error } = useQuery(
    ["/categories"],
    async () => {
      const data = await services.get.symptoms();
      return data;
    },
    {
      enabled: !!auth.currentUser.uid,
      onError: (e) => {
        toast.errorToast("Failed to load symptoms");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded symptoms successfully");
      },
      initialData: [],
      refetchOnWindowFocus: false,
    }
  );

  console.log("data in context", data, isFetching, error);

  return (
    <SymptomsContext.Provider value={{ data }}>
      {children}
    </SymptomsContext.Provider>
  );
};

export const useSymptomsContext = () => {
  return useContext(SymptomsContext);
};
