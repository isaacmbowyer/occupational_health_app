import { createContext, useContext } from "react";
import { IProviderProps } from "../../entities/IProviderProps";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useQuery } from "@tanstack/react-query";
import { services } from "../../services";

const SymptomsContext = createContext({} as any);

export const SymptomsProvider = ({ children }: IProviderProps) => {
  const toast = useCustomToast();

  const { data, isFetching } = useQuery(
    ["/symptoms"],
    async () => {
      const data = await services.get.symptoms();
      return data;
    },
    {
      enabled: true,
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

  return (
    <SymptomsContext.Provider
      value={{
        data: data,
        isFetching: isFetching,
      }}
    >
      {children}
    </SymptomsContext.Provider>
  );
};

export const useSymptomsContext = () => {
  return useContext(SymptomsContext);
};
