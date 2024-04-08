import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../../../entities/IProviderProps";
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
import { IScore } from "../../../entities/IScore";
import { useUsersContext } from "../../../contexts/useUsersContext";
import { IResource } from "../../../entities/IResource";
import { auth } from "../../../config/firebase";
import { Linking } from "react-native";
import { ISymptomGoalStateKey } from "../../../entities/ISymptomGoalStateKey";
import { ISymptomGoalStateKeyValue } from "../../../entities/ISymptomGoalStateKeyValue";
import { ISymptomGoalState } from "../../../entities/ISymptomGoalState";

const SymptomGoalContext = createContext({} as ISymptomGoalContext);

const TAGS = ["All", "Website", "Video"];

export const SymptomGoalProvider = ({ children }: IProviderProps) => {
  const toast = useCustomToast();
  const severityList = useSeverityRatings();
  const { currentSymptom } = useCurrentEntityContext();
  const { data: users, isFetching: isFetchingUsers } = useUsersContext();

  const INITIAL_STATE: ISymptomGoalState = {
    targetSeverity: createSeverityOption(
      severityList,
      String(currentSymptom?.targetSeverity)
    ),
    targetDate: currentSymptom?.targetDate,
    currentPage: 1,
    isLoading: false,
    source: "All",
  };

  const [state, setState] = useState<ISymptomGoalState>(INITIAL_STATE);

  const LIMIT = SERVICES_LIMITS.DEFAULT_LIMIT;
  const SKIP = (state?.currentPage - 1) * LIMIT;

  const { averageScores, isFetching: isFetchingRatings } = useSymptomRatings();

  const { state: resourcesState, methods: resourcesMethods } =
    useSymptomResources({
      limit: LIMIT,
      skip: SKIP,
      source: state?.source,
      currentPage: state?.currentPage,
    });

  // ACTION METHODS
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

  const handleOnChange = (
    key: ISymptomGoalStateKey,
    value: ISymptomGoalStateKeyValue
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));

    if (key === "targetDate")
      return _handleOnEdit(value as Date, state?.targetSeverity);

    if (key === "targetSeverity")
      return _handleOnEdit(state?.targetDate, value as IOption);

    if (key === "source")
      return setState((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleOnLikeResource = async (resource: IResource) => {
    const isLiked = resource?.isLiked;

    try {
      _handleSetLoading(true);

      await services.update.symptomResourceId({
        id: resource?.likedId,
        resourceId: resource?.id,
        userId: auth?.currentUser?.uid,
      });

      toast.successToast(
        `Successfuly ${isLiked ? "unliked" : "liked"} the symptom resource`
      );
    } catch (e: any) {
      console.log("ERROR", e);
      toast.errorToast(
        `Unable to ${isLiked ? "unlike" : "like"} the symptom resource.`
      );
    } finally {
      _handleSetLoading(false);
      resourcesMethods.handleOnRefetch();
    }
  };

  const handleOnViewResource = (link: string) => {
    Linking.openURL(link).catch((err) =>
      toast.errorToast("Unable to open this resource link")
    );
  };

  const handleOnTrackSymptom = () => {
    console.log("Navigate");
  };

  const isFetching =
    isFetchingRatings || resourcesState.isFetching || isFetchingUsers;

  return (
    <SymptomGoalContext.Provider
      value={{
        state: {
          title: currentSymptom?.name,
          currentSeverity: currentSymptom?.currentSeverity,
          targetSeverity: state?.targetSeverity,
          targetDate: state?.targetDate,
          activeSource: state?.source,
          daysLeft: getDaysLeft(state?.targetDate),
          isFetching: isFetching,
          currentPage: state?.currentPage,
          count: resourcesState.totalCount,
          totalPages: resourcesState.totalPages,
          limit: LIMIT,
          severityList: severityList,
          averageScores: averageScores,
          numberOfUsers: users?.count,
          resources: resourcesState?.symptomResources,
          tagList: TAGS,
        },
        methods: {
          handleOnChange: handleOnChange,
          handleOnPress: handleOnTrackSymptom,
          handleOnLike: handleOnLikeResource,
          handleOnView: handleOnViewResource,
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
    activeSource: string;
    isFetching: boolean;
    currentPage: number;
    count: number;
    totalPages: number;
    limit: number;
    severityList: IOption[];
    averageScores: IScore[];
    numberOfUsers: number;
    resources: IResource[];
    tagList: string[];
  };
  methods: {
    handleOnChange: (
      key: ISymptomGoalStateKey,
      value: ISymptomGoalStateKeyValue
    ) => void;
    handleOnPress: () => void;
    handleOnLike: (item: IResource) => void;
    handleOnView: (link: string) => void;
  };
}