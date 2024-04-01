import { createContext, useContext, useState } from "react";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { IProviderProps } from "../../../entities/IProviderProps";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSymptomsContext } from "../../../contexts/useSymptomsContext";
import { SERVICES_LIMITS } from "../../../config/services";
import { useGetTrackedSymptoms } from "../../../hooks/useGetTrackedSymptoms";
import { auth } from "../../../config/firebase";
import { services } from "../../../services";
import { formatUserSymptoms } from "../../../utils/formatUserSymptoms";
import { IUserSymptom } from "../../../entities/IUserSymptom";

const TrackedSymptomsContext = createContext({} as ITrackedSymptomsContext);

interface ITrackedSymptomsState {
  currentPage: number;
  isLoading: boolean;
}

const INITAL_STATE: ITrackedSymptomsState = {
  currentPage: 1,
  isLoading: false,
};

export const TrackedSymptomsProvider = ({ children }: IProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useCustomToast();
  const { data: symptomList, isFetching: isFetchingSymptoms } =
    useSymptomsContext();

  const [state, setState] = useState<ITrackedSymptomsState>(INITAL_STATE);

  const LIMIT = SERVICES_LIMITS.DEFAULT_LIMIT;
  const SKIP = (state.currentPage - 1) * LIMIT;

  const { state: trackedSymptomsState, methods: trackedSymptomsMethods } =
    useGetTrackedSymptoms({
      userId: +auth.currentUser.uid,
      limit: LIMIT,
      skip: SKIP,
    });

  // STATE METHODS
  const _handleSetLoading = (boolean: boolean) => {
    setState((prev) => ({ ...prev, isLoading: boolean }));
  };

  const handleSetCurrentPage = (newPage: number) => {
    setState((prev) => ({ ...prev, currentPage: newPage }));
  };

  // ACTION METHODS
  const handleDeleteTrackedSymptom = async (symptomId: string) => {
    try {
      _handleSetLoading(true);

      await services.delete.trackedSymptomId({
        id: symptomId,
      });

      trackedSymptomsMethods.handleOnRefetch();
    } catch (e: any) {
      toast.errorToast("Failed to this tracked symptom.");
    } finally {
      _handleSetLoading(false);
    }
  };

  const handleNavigateToTrackedSymptom = (symptomId: string) => {
    console.log(symptomId);
  };

  const handleAddTrackedSymptom = () => {
    console.log("Add a new symptom");
  };

  const userSymptoms = formatUserSymptoms({
    symptoms: symptomList,
    trackedSymptoms: trackedSymptomsState.trackedSymptoms,
  });

  const isFetching = trackedSymptomsState.isFetching || isFetchingSymptoms;

  return (
    <TrackedSymptomsContext.Provider
      value={{
        state: {
          isFetching: isFetching,
          currentPage: state?.currentPage,
          count: trackedSymptomsState?.count,
          totalPages: trackedSymptomsState?.totalPages,
          limit: LIMIT,
          symptoms: userSymptoms,
        },
        methods: {
          handleOnDelete: handleDeleteTrackedSymptom,
          handleOnPress: handleNavigateToTrackedSymptom,
          handleOnAdd: handleAddTrackedSymptom,
          handleSetCurrentPage: handleSetCurrentPage,
        },
      }}
    >
      {children}
    </TrackedSymptomsContext.Provider>
  );
};

export const useTrackedSymptomsContext = () => {
  return useContext(TrackedSymptomsContext);
};

interface ITrackedSymptomsContext {
  state: {
    isFetching: boolean;
    currentPage: number;
    count: number;
    totalPages: number;
    limit: number;
    symptoms: IUserSymptom[];
  };
  methods: {
    handleOnDelete: (symptomId: string) => void;
    handleOnPress: (symptomId: string) => void;
    handleOnAdd: () => void;
    handleSetCurrentPage: (newPage: number) => void;
  };
}
