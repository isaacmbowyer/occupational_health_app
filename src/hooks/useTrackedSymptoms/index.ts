import { useQuery } from "@tanstack/react-query";
import { useCustomToast } from "../useCustomToast";
import { services } from "../../services";
import { calculateNumberOfPages } from "../../utils/calculateNumberOfPages";
import { ITrackedSymptomsResponse } from "../../entities/ITrackedSymptomsResponse";
import { ITrackedSymptom } from "../../entities/ITrackedSymptom";
import { auth } from "../../config/firebase";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";
import { SERVICES_LIMITS } from "../../config/services";
import { getLimit } from "../../utils/getLimit";
import { ISymptom } from "../../entities/ISymptom";

const INIITAL_DATA: ITrackedSymptomsResponse = {
  count: 0,
  results: [],
};

export const useTrackedSymptoms = ({
  limit = SERVICES_LIMITS.UNLIMITED,
  source = "all",
  currentPage = 1,
  skip = 0,
  symptomList = [],
  config = [],
}: IProps): IUseTrackedSymptomsResponse => {
  const { state } = useAuthenticationContext();
  const toast = useCustomToast();

  const { data, isFetching, refetch } = useQuery(
    ["/tracked_symptoms", source, limit, currentPage, config],
    async () => {
      const data = await services.get.trackedSymptoms({
        userId: auth?.currentUser?.uid,
        source: source,
        currentPage: currentPage,
        limit: getLimit(limit, currentPage),
        config: config,
        skip: skip,
        symptomList: symptomList,
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

interface IProps {
  limit?: number;
  skip?: number;
  source?: string;
  currentPage?: number;
  config?: any[];
  symptomList?: ISymptom[];
}
