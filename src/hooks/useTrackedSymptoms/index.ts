import { useQuery } from "@tanstack/react-query";
import { useCustomToast } from "../useCustomToast";
import { services } from "../../services";
import { calculateNumberOfPages } from "../../utils/calculateNumberOfPages";
import { ITrackedSymptomsResponse } from "../../entities/ITrackedSymptomsResponse";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";
import { auth } from "../../config/firebase";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";
import { ISourcePageProps } from "../../entities/ISourcePageProps";
import { SERVICES_LIMITS } from "../../config/services";

const INIITAL_DATA: ITrackedSymptomsResponse = {
  count: 0,
  results: [],
};

export const useTrackedSymptoms = ({
  skip = 0,
  limit = SERVICES_LIMITS.UNLIMITED,
  source = "all",
}: ISourcePageProps): IUseTrackedSymptomsResponse => {
  const { state } = useAuthenticationContext();
  const toast = useCustomToast();

  const { data, isFetching, refetch } = useQuery(
    ["/tracked_symptoms", source, limit, skip],
    async () => {
      console.log("FETCHING DATA...");
      const data = await services.get.trackedSymptoms({
        userId: auth?.currentUser?.uid,
        skip: skip,
        pageLimit: limit,
        source: source,
      });

      console.log(data);
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
      refetchInterval: 15000,
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
