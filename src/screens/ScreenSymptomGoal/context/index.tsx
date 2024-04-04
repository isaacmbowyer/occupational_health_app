import { createContext, useContext, useEffect, useState } from "react";
import { IProviderProps } from "../../../entities/IProviderProps";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCurrentEntityContext } from "../../../contexts/useCurrentEntityContext";
import { getDaysLeft } from "../../../utils/getDaysLeft";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { services } from "../../../services";

const SymptomGoalContext = createContext({} as ISymptomGoalContext);

export const SymptomGoalProvider = ({ children }: IProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useCustomToast();
  const { currentSymptom } = useCurrentEntityContext();

  const INITIAL_STATE: ISymptomGoalState = {
    targetSeverity: currentSymptom?.targetSeverity,
    targetDate: currentSymptom?.targetDate,
    isLoading: false,
  };

  const [state, setState] = useState<ISymptomGoalState>(INITIAL_STATE);

  // ACTION METHODS
  const handleOnChange = (
    key: ISymptomGoalStateKey,
    value: ISymptomGoalStateKeyValue
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
    _handleOnEdit();
  };

  const _handleSetLoading = (bool: boolean) => {
    setState((prev) => ({ ...prev, isLoading: bool }));
  };

  const _handleOnEdit = async () => {
    try {
      await services.update.trackedSymptomId({
        id: currentSymptom?.id,
        currentSeverity: currentSymptom?.currentSeverity,
        targetSeverity: state?.targetSeverity,
        targetDate: state?.targetDate,
      });

      toast.successToast("Successfully updated the Symptom details");
    } catch (e: any) {
      toast.errorToast("Unable to update the symptom. Try again later");
    }
  };

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
        methods: {
          handleOnChange: handleOnChange,
        },
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
  methods: {
    handleOnChange: (
      key: ISymptomGoalStateKey,
      value: ISymptomGoalStateKeyValue
    ) => void;
  };
}

interface ISymptomGoalState {
  targetSeverity: number;
  targetDate: Date;
  isLoading: boolean;
}

type ISymptomGoalStateKey = keyof ISymptomGoalState;
type ISymptomGoalStateKeyValue = number | Date;
