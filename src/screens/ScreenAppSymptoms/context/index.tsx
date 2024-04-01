import { createContext, useContext, useState } from "react";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { IProviderProps } from "../../../entities/IProviderProps";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSymptomsContext } from "../../../contexts/useSymptomsContext";
import { SERVICES_LIMITS } from "../../../config/services";
import { useGetTrackedSymptoms } from "../../../hooks/useGetTrackedSymptoms";
import { auth } from "../../../config/firebase";

const TrackedSymptomsContext = createContext({} as ITrackedSymptomsContext);

interface ITrackedSymptomsState {
  currentPage: number;
}

const INITAL_STATE: ITrackedSymptomsState = {
  currentPage: 1,
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

  return (
    <TrackedSymptomsContext.Provider
      value={{
        state: {},
        methods: {},
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
  state: {};
  methods: {};
}
