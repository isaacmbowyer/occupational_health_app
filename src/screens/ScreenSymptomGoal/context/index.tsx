import { createContext, useContext, useEffect, useState } from "react";
import { IProviderProps } from "../../../entities/IProviderProps";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCurrentEntityContext } from "../../../contexts/useCurrentEntityContext";
import { getDaysLeft } from "../../../utils/getDaysLeft";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { services } from "../../../services";
import { useSymptomRatings } from "../../../hooks/useSymptomRatings";
import { SERVICES_LIMITS } from "../../../config/services";
import { useSymptomResources } from "../../../hooks/useSymptomResources";
import { useSeverityRatings } from "../../../hooks/useSeverityRatings";
import { IOption } from "../../../entities/IOption";
import { createSeverityOption } from "../../../utils/createSeverityOption";
import { calculateAverageScores } from "../../../utils/calculateAverageScores";
import { IScore } from "../../../entities/IScore";

const SymptomGoalContext = createContext({} as ISymptomGoalContext);

export const SymptomGoalProvider = ({ children }: IProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useCustomToast();
  const severityList = useSeverityRatings();
  const { currentSymptom } = useCurrentEntityContext();

  const INITIAL_STATE: ISymptomGoalState = {
    targetSeverity: createSeverityOption(
      severityList,
      String(currentSymptom?.targetSeverity)
    ),
    targetDate: currentSymptom?.targetDate,
    currentPage: 1,
    isLoading: false,
    source: "Website",
  };

  const [state, setState] = useState<ISymptomGoalState>(INITIAL_STATE);

  const LIMIT = SERVICES_LIMITS.DEFAULT_LIMIT;
  const SKIP = (state?.currentPage - 1) * LIMIT;

  const { averageScores, isFetching: isFetchingRatings } = useSymptomRatings();

  const {
    symptomResources,
    totalCount,
    isFetching: isFetchingResources,
  } = useSymptomResources({
    limit: LIMIT,
    skip: SKIP,
    source: state?.source,
  });

  // ACTION METHODS
  const handleOnChange = (
    key: ISymptomGoalStateKey,
    value: ISymptomGoalStateKeyValue
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));

    if (key === "targetDate")
      return _handleOnEdit(value as Date, state?.targetSeverity);

    if (key === "targetSeverity")
      return _handleOnEdit(state?.targetDate, value as IOption);
  };

  const _handleSetLoading = (bool: boolean) => {
    setState((prev) => ({ ...prev, isLoading: bool }));
  };

  const _handleOnEdit = async (
    newTargetDate: Date,
    newTargetSeverity: IOption
  ) => {
    try {
      _handleSetLoading(true);

      await services.update.trackedSymptomId({
        id: currentSymptom?.id,
        currentSeverity: currentSymptom?.currentSeverity,
        targetSeverity: +newTargetSeverity?.name,
        targetDate: newTargetDate,
      });

      toast.successToast("Successfully updated the Symptom details");
    } catch (e: any) {
      toast.errorToast("Unable to update the symptom. Try again later");
    } finally {
      _handleSetLoading(false);
    }
  };

  const handleOnTrackSymptom = () => {
    console.log("Navigate");
  };

  const isFetching = isFetchingRatings || isFetchingResources;

  return (
    <SymptomGoalContext.Provider
      value={{
        state: {
          title: currentSymptom?.name,
          currentSeverity: currentSymptom?.currentSeverity,
          targetSeverity: state?.targetSeverity,
          targetDate: state?.targetDate,
          daysLeft: getDaysLeft(state?.targetDate),
          isFetching: isFetching,
          currentPage: state?.currentPage,
          count: symptomResources?.length,
          totalPages: totalCount,
          limit: LIMIT,
          severityList: severityList,
          averageScores: averageScores,
        },
        methods: {
          handleOnChange: handleOnChange,
          handleOnPress: handleOnTrackSymptom,
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
    targetSeverity: IOption;
    targetDate: Date;
    daysLeft: number;
    isFetching: boolean;
    currentPage: number;
    count: number;
    totalPages: number;
    limit: number;
    severityList: IOption[];
    averageScores: IScore[];
  };
  methods: {
    handleOnChange: (
      key: ISymptomGoalStateKey,
      value: ISymptomGoalStateKeyValue
    ) => void;
    handleOnPress: () => void;
  };
}

interface ISymptomGoalState {
  targetSeverity: IOption;
  targetDate: Date;
  currentPage: number;
  isLoading: boolean;
  source: string;
}

type ISymptomGoalStateKey = keyof ISymptomGoalState;
type ISymptomGoalStateKeyValue = IOption | Date;
