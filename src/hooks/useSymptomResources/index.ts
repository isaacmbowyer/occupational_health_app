import { useQuery } from "@tanstack/react-query";
import { useCustomToast } from "../useCustomToast";
import { services } from "../../services";
import { auth } from "../../config/firebase";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";
import { useCurrentEntityContext } from "../../contexts/useCurrentEntityContext";
import { IResource } from "../../entities/IResource";
import { ISourcePageProps } from "../../entities/ISourcePageProps";
import { IResourceResponse } from "../../entities/IResourceResponse";
import { calculateNumberOfPages } from "../../utils/calculateNumberOfPages";
import { getLimit } from "../../utils/getLimit";

const INITAL_DATA: IResourceResponse = {
  count: 0,
  results: [],
};

export const useSymptomResources = (
  props: ISourcePageProps
): ISymptomResourcesResponse => {
  const { state } = useAuthenticationContext();
  const { currentSymptom } = useCurrentEntityContext();

  const toast = useCustomToast();

  const { data, isFetching, refetch } = useQuery(
    ["/resources", props?.limit, props?.skip, props?.source],
    async () => {
      const data = await services.get.resources({
        userId: auth?.currentUser?.uid,
        symptomId: currentSymptom?.symptomId,
        source: props?.source,
        limit: getLimit(props?.limit, props?.currentPage),
        currentPage: props?.currentPage,
      });

      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load symptom resources");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded symptom resources successfully");
      },
      initialData: INITAL_DATA,
      refetchOnWindowFocus: false,
    }
  );

  const resourcesCount = data?.count;
  const totalPages = calculateNumberOfPages(resourcesCount);

  const handleOnRefetch = () => {
    refetch();
  };

  return {
    state: {
      totalCount: resourcesCount,
      totalPages: totalPages,
      symptomResources: data.results,
      isFetching: isFetching,
    },
    methods: {
      handleOnRefetch: handleOnRefetch,
    },
  };
};

interface ISymptomResourcesResponse {
  state: {
    totalCount: number;
    totalPages: number;
    symptomResources: IResource[];
    isFetching: boolean;
  };
  methods: {
    handleOnRefetch: () => void;
  };
}
