import { createContext, useContext, useState } from "react";
import { IUserSymptom } from "../../entities/IUserSymptom";
import { IWorkResource } from "../../entities/IWorkResource";

interface ICurrentSymptomContext {
  currentSymptom: IUserSymptom;
  currentWorkResource: IWorkResource;
  currentSymptomPage: number;
  setCurrentWorkResource: (resource: IWorkResource) => void;
  setCurrentSymptom: (data: IUserSymptom) => void;
  setCurrentSymptomPage: (page: number) => void;
}

interface ICurrentEntityContext extends ICurrentSymptomContext {}

const CurrentEntityContext = createContext({} as ICurrentEntityContext);

export const CurrentEntityProvider = ({ children }) => {
  const [currentSymptom, setCurrentSymptom] = useState<IUserSymptom>(null);
  const [currentWorkResource, setCurrentWorkResource] =
    useState<IWorkResource>(null);
  const [currentSymptomPage, setCurrentSymptomPage] = useState<number>(0);

  return (
    <CurrentEntityContext.Provider
      value={{
        currentSymptom,
        currentWorkResource,
        currentSymptomPage,
        setCurrentSymptom,
        setCurrentWorkResource,
        setCurrentSymptomPage,
      }}
    >
      {children}
    </CurrentEntityContext.Provider>
  );
};

export const useCurrentEntityContext = () => {
  return useContext(CurrentEntityContext);
};
