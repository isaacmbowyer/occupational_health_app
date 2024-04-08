import { createContext, useContext, useState } from "react";
import { IUserSymptom } from "../../entities/IUserSymptom";

interface ICurrentSymptomContext {
  currentSymptom: IUserSymptom;
  setCurrentSymptom: (data: IUserSymptom) => void;
}

interface ICurrentEntityContext extends ICurrentSymptomContext {}

const CurrentEntityContext = createContext({} as ICurrentEntityContext);

export const CurrentEntityProvider = ({ children }) => {
  const [currentSymptom, setCurrentSymptom] = useState<IUserSymptom>(null);

  return (
    <CurrentEntityContext.Provider
      value={{
        currentSymptom,
        setCurrentSymptom,
      }}
    >
      {children}
    </CurrentEntityContext.Provider>
  );
};

export const useCurrentEntityContext = () => {
  return useContext(CurrentEntityContext);
};
