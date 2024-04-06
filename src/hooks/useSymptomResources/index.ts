import { useQuery } from "@tanstack/react-query";
import { useCustomToast } from "../useCustomToast";
import { services } from "../../services";
import { auth } from "../../config/firebase";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";
import { useCurrentEntityContext } from "../../contexts/useCurrentEntityContext";
import { IResource } from "../../entities/IResource";
import { ISourcePageProps } from "../../entities/ISourcePageProps";
import { IResourceResponse } from "../../entities/IResourceResponse";

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

  const { data, isFetching } = useQuery(
    ["/resources"],
    async () => {
      const data = await services.get.symptomResources({
        userId: auth?.currentUser?.uid,
        symptomId: currentSymptom?.symptomId,
        source: props?.source,
        pageLimit: props?.limit,
        skip: props?.skip,
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

  return {
    totalCount: data?.count,
    symptomResources: data.results,
    isFetching,
  };
};

interface ISymptomResourcesResponse {
  totalCount: number;
  symptomResources: IResource[];
  isFetching: boolean;
}
