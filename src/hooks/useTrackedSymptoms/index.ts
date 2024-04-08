import { useQuery } from "@tanstack/react-query";
import { useCustomToast } from "../useCustomToast";
import { services } from "../../services";
import { calculateNumberOfPages } from "../../utils/calculateNumberOfPages";
import { ITrackedSymptomsResponse } from "../../entities/ITrackedSymptomsResponse";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";
import { auth } from "../../config/firebase";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";
import { ISourcePageProps } from "../../entities/ISourcePageProps";

const INIITAL_DATA: ITrackedSymptomsResponse = {
  count: 0,
  results: [],
};

export const useTrackedSymptoms = ({
  skip,
  limit,
  source,
}: ISourcePageProps): IUseTrackedSymptomsResponse => {
  const { state } = useAuthenticationContext();
  const toast = useCustomToast();

  const { data, isFetching, refetch } = useQuery(
    ["/tracked_symptoms", source, limit, skip],
    async () => {
      const data = await services.get.trackedSymptoms({
        userId: auth?.currentUser?.uid,
        skip: skip,
        pageLimit: limit,
        source: source,
      });

      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load your tracked symptoms");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded your tracked symptoms successfully");
      },
      initialData: INIITAL_DATA,
      refetchOnWindowFocus: false,
    }
  );

  const refetchTrackedSymptoms = () => {
    refetch();
  };

  const trackedSymptoms = data?.results || [];
  const trackedSymptomsCount = data?.count || 0;
  const totalPages = calculateNumberOfPages(trackedSymptomsCount);

  return {
    state: {
      trackedSymptoms: trackedSymptoms,
      count: trackedSymptomsCount,
      totalPages: totalPages,
      isFetching: isFetching,
    },
    methods: {
      handleOnRefetch: refetchTrackedSymptoms,
    },
  };
};

interface IUseTrackedSymptomsResponse {
  state: {
    trackedSymptoms: ITrackedSymptom[];
    count: number;
    totalPages: number;
    isFetching: boolean;
  };
  methods: {
    handleOnRefetch: () => void;
  };
}
