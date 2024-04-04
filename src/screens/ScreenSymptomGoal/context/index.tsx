import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../../../entities/IProviderProps";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCurrentEntityContext } from "../../../contexts/useCurrentEntityContext";
import { getDaysLeft } from "../../../utils/getDaysLeft";

const SymptomGoalContext = createContext({} as ISymptomGoalContext);

export const SymptomGoalProvider = ({ children }: IProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { currentSymptom } = useCurrentEntityContext();

  const INITIAL_STATE: ISymptomGoalState = {
    targetSeverity: currentSymptom?.targetSeverity,
    targetDate: currentSymptom?.targetDate,
  };

  const [state, setState] = useState<ISymptomGoalState>(INITIAL_STATE);

  return (
    <SymptomGoalContext.Provider
      value={{
        state: {
          title: currentSymptom?.name,
          currentSeverity: currentSymptom?.currentSeverity,
          targetSeverity: state?.targetSeverity,
          targetDate: state?.targetDate,
          daysLeft: getDaysLeft(state?.targetDate),
        },
        methods: {},
      }}
    >
      {children}
    </SymptomGoalContext.Provider>
  );
};

export const useSymptomGoalContext = () => {
  return useContext(SymptomGoalContext);
};

interface ISymptomGoalContext {
  state: {
    title: string;
    currentSeverity: number;
    targetSeverity: number;
    targetDate: Date;
    daysLeft: number;
  };
  methods: {};
}

interface ISymptomGoalState {
  targetSeverity: number;
  targetDate: Date;
}
