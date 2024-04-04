import { useQuery } from "@tanstack/react-query";
import { useCustomToast } from "../useCustomToast";
import { services } from "../../services";
import { auth } from "../../config/firebase";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";
import { ISymptomScore } from "../../entities/ISymptomScore";
import { useCurrentEntityContext } from "../../contexts/useCurrentEntityContext";

export const useGetSymptomRatings = (): IUseGetSymptomIdScoresResponse => {
  const { state } = useAuthenticationContext();
  const { currentSymptom } = useCurrentEntityContext();

  const toast = useCustomToast();

  const { data, isFetching } = useQuery(
    ["/scores"],
    async () => {
      const data = await services.get.symptomIdScores({
        userId: auth?.currentUser?.uid,
        symptomId: currentSymptom?.symptomId,
      });

      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load your symptom ratings");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded your symptom ratings successfully");
      },
      initialData: [],
      refetchOnWindowFocus: false,
    }
  );

  return {
    symptomRatings: data,
    isFetching,
  };
};

interface IUseGetSymptomIdScoresResponse {
  symptomRatings: ISymptomScore[];
  isFetching: boolean;
}
