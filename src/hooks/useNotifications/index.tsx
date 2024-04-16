import { useQuery } from "@tanstack/react-query";
import { useCustomToast } from "../useCustomToast";
import { services } from "../../services";
import { calculateNumberOfPages } from "../../utils/calculateNumberOfPages";
import { auth } from "../../config/firebase";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";
import { INotificationTag } from "../../entities/INotificationTag";
import { INotificationResponse } from "../../entities/INotificationResponse";
import { INotification } from "../../entities/INotification";
import { getLimit } from "../../utils/getLimit";

const INIITAL_DATA: INotificationResponse = {
  count: 0,
  results: [],
};

export const useNotifications = ({
  limit,
  source,
  currentPage,
}: IProps): IUseNotificationsResponse => {
  const { state } = useAuthenticationContext();
  const toast = useCustomToast();

  const { data, isFetching, refetch } = useQuery(
    ["/tracked_symptoms", source, limit, currentPage],
    async () => {
      const data = await services.get.notifications({
        userId: auth?.currentUser?.uid,
        source: source,
        currentPage: currentPage,
        limit: getLimit(limit, currentPage),
      });

      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load your notifications");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded your notifications successfully");
      },
      initialData: INIITAL_DATA,
      refetchOnWindowFocus: false,
      refetchInterval: 15000,
    }
  );

  const refetchTrackedSymptoms = () => {
    refetch();
  };

  const trackedNotifications = data?.results || [];
  const trackedNotificationCount = data?.count || 0;
  const totalPages = calculateNumberOfPages(trackedNotificationCount);

  return {
    state: {
      notifications: trackedNotifications,
      count: trackedNotificationCount,
      totalPages: totalPages,
      isFetching: isFetching,
    },
    methods: {
      handleOnRefetch: refetchTrackedSymptoms,
    },
  };
};

interface IUseNotificationsResponse {
  state: {
    notifications: INotification[];
    count: number;
    totalPages: number;
    isFetching: boolean;
  };
  methods: {
    handleOnRefetch: () => void;
  };
}

interface IProps {
  limit: number;
  source: INotificationTag;
  currentPage: number;
}
