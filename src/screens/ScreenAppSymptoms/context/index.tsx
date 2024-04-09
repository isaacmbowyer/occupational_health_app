import { createContext, useContext, useState } from "react";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { IProviderProps } from "../../../entities/IProviderProps";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSymptomsContext } from "../../../contexts/useSymptomsContext";
import { SERVICES_LIMITS } from "../../../config/services";
import { services } from "../../../services";
import { formatUserSymptoms } from "../../../utils/formatUserSymptoms";
import { IUserSymptom } from "../../../entities/IUserSymptom";
import { IAdvancedSearch } from "../../../entities/IAdvancedSearch";
import { INITAL_OPTION } from "../../../data/defaultValues";
import { useSeverityTypes } from "../../../hooks/useSeverityTypes";
import { IOption } from "../../../entities/IOption";
import { createDropdownOptions } from "../../../utils/createDropdownOptions";
import { IAdvancedSearchStateKey } from "../../../entities/IAdvancedSearchStateKey";
import { IAdvancedSearchStateKeyValue } from "../../../entities/IAdvancedSearchStateKeyValue";
import { useCurrentEntityContext } from "../../../contexts/useCurrentEntityContext";
import { useTrackedSymptoms } from "../../../hooks/useTrackedSymptoms";
import { auth } from "../../../config/firebase";
import { ISymptom } from "../../../entities/ISymptom";
import { P } from "@expo/html-elements";

const TrackedSymptomsContext = createContext({} as ITrackedSymptomsContext);

const TAGS = ["current", "past"];
const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

interface ITrackedSymptomsState {
  isLoading: boolean;
  currentPage: number;
  source: string;
  isSearchActive: boolean;
}

const INITAL_STATE: ITrackedSymptomsState = {
  currentPage: 1,
  isLoading: false,
  source: "current",
  isSearchActive: false,
};

const INITAL_SEARCH: IAdvancedSearch = {
  symptom: "",
  targetDate: new Date(),
  currentRating: INITAL_OPTION,
  targetRating: INITAL_OPTION,
  severityType: INITAL_OPTION,
};

export const TrackedSymptomsProvider = ({ children }: IProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toast = useCustomToast();
  const { setCurrentSymptom } = useCurrentEntityContext();

  const [state, setState] = useState<ITrackedSymptomsState>(INITAL_STATE);
  const [searchState, setSearchState] =
    useState<IAdvancedSearch>(INITAL_SEARCH);

  const LIMIT = SERVICES_LIMITS.DEFAULT_LIMIT;
  const SKIP = (state?.currentPage - 1) * LIMIT;

  // DATA
  const { data: symptomList, isFetching: isFetchingSymptoms } =
    useSymptomsContext();

  const { state: trackedSymptomsState, methods: trackedSymptomsMethods } =
    useTrackedSymptoms({
      limit: LIMIT,
      skip: SKIP,
      source: state?.source,
      currentPage: state?.currentPage,
    });

  const userSymptoms = formatUserSymptoms({
    symptoms: symptomList,
    trackedSymptoms: trackedSymptomsState.trackedSymptoms,
  });

  const severityTypeList = useSeverityTypes();
  const ratingList = createDropdownOptions(NUMBERS);

  // STATE METHODS
  const _handleSetLoading = (boolean: boolean) => {
    setState((prev) => ({ ...prev, isLoading: boolean }));
  };

  const handleOnChange = (
    key: IAppSymptomsStateKey,
    value: IAppSymptomsStateKeyValue
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSetSearch = (
    key: IAdvancedSearchStateKey,
    value: IAdvancedSearchStateKeyValue
  ) => {
    setSearchState((state) => ({ ...state, [key]: value }));
  };

  // ACTION METHODS
  const handleToggleSearch = () => {
    setSearchState(INITAL_SEARCH);
    handleOnChange("isSearchActive", !state?.isSearchActive);
  };

  // ACTION METHODS
  const handleDeleteTrackedSymptom = async (symptom: IUserSymptom) => {
    try {
      _handleSetLoading(true);

      await services.delete.trackedSymptomId(symptom?.id);

      await services.delete.symptomScores({
        userId: auth.currentUser.uid,
        symptomId: symptom?.symptomId,
      });

      trackedSymptomsMethods.handleOnRefetch();
    } catch (e: any) {
      toast.errorToast("Failed to delete this tracked symptom.");
    } finally {
      _handleSetLoading(false);
    }
  };

  const handleNavigateToTrackedSymptom = (symptom: IUserSymptom) => {
    setCurrentSymptom(symptom);
    navigation.navigate("Symptom Goal");
  };

  const handleAddTrackedSymptom = () => {
    navigation.navigate("Add Symptom");
  };

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
          tagList: TAGS,
          severityTypeOptions: severityTypeList,
          ratingOptions: ratingList,
          source: state?.source,
          isSearchActive: state?.isSearchActive,
          symptom: searchState?.symptom,
          targetDate: searchState?.targetDate,
          currentRating: searchState?.currentRating,
          targetRating: searchState?.targetRating,
          severityType: searchState?.severityType,
        },
        methods: {
          handleOnDelete: handleDeleteTrackedSymptom,
          handleOnPress: handleNavigateToTrackedSymptom,
          handleOnAdd: handleAddTrackedSymptom,
          handleOnChange: handleOnChange,
          handleToggleSearch: handleToggleSearch,
          handleSetSearch: handleSetSearch,
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
    source: string;
    tagList: string[];
    severityTypeOptions: IOption[];
    ratingOptions: IOption[];
    isSearchActive: boolean;
    symptom: string;
    currentRating: IOption;
    targetRating: IOption;
    targetDate: Date;
    severityType: IOption;
  };
  methods: {
    handleOnDelete: (symptom: IUserSymptom) => void;
    handleOnPress: (symptom: IUserSymptom) => void;
    handleOnAdd: () => void;
    handleOnChange: (
      key: IAppSymptomsStateKey,
      value: IAppSymptomsStateKeyValue
    ) => void;
    handleSetSearch: (
      key: IAdvancedSearchStateKey,
      value: IAdvancedSearchStateKeyValue
    ) => void;
    handleToggleSearch: () => void;
  };
}

type IAppSymptomsStateKey = keyof ITrackedSymptomsState;
type IAppSymptomsStateKeyValue = boolean | number | string;
