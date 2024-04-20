import { createContext, useContext, useState } from "react";
import { IProviderProps } from "../../../entities/IProviderProps";
import { INotificationTag } from "../../../entities/INotificationTag";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { INotificationState } from "../../../entities/INotificationState";
import { SERVICES_LIMITS } from "../../../config/services";
import { services } from "../../../services";
import { INotificationStateKey } from "../../../entities/INotificationStateKey";
import { INotificationStateKeyValue } from "../../../entities/INotificationStateKeyValue";
import { useNotifications } from "../../../hooks/useNotifications";
import { INotification } from "../../../entities/INotification";
import { formatTitleWithCount } from "../../../utils/formatTitleWithCount";
import { decideScreenStateToRender } from "../../../utils/decideScreenStateToRender";
import { IRenderOptionsOutput } from "../../../entities/IRenderOptionsOutput";

const NotificationsContext = createContext({} as INotificationContext);

const TAGS: INotificationTag[] = ["All", "Unread", "Read"];

const INITIAL_STATE: INotificationState = {
  currentPage: 1,
  isLoading: false,
  source: "All",
};

export const NotificationsProvider = ({ children }: IProviderProps) => {
  const toast = useCustomToast();

  const [state, setState] = useState<INotificationState>(INITIAL_STATE);

  const LIMIT = SERVICES_LIMITS.EXPANDED_LIMIT;

  const { state: notificationState, methods: notificationMethods } =
    useNotifications({
      currentPage: state?.currentPage,
      source: state?.source,
      limit: LIMIT,
    });

  // ACTION METHODS
  const _handleSetLoading = (bool: boolean) => {
    setState((prev) => ({ ...prev, isLoading: bool }));
  };

  const handleOnRemoveNotification = async (notificationId: string) => {
    try {
      _handleSetLoading(true);

      await services.delete.notification({
        id: notificationId,
      });

      toast.successToast(`Successfuly removed the notification`);
    } catch (e: any) {
      console.log("ERROR", e);
      toast.errorToast(`Unable to remove the notification. Try again later`);
    } finally {
      _handleSetLoading(false);
      notificationMethods.handleOnRefetch();
    }
  };

  const handleOnMarkAsReadOrUnreadNotification = async (
    notificationId: string,
    isRead: boolean
  ) => {
    try {
      _handleSetLoading(true);

      await services.update.notification({
        id: notificationId,
        isRead: !isRead,
      });

      toast.successToast(`Successfuly updated the notification`);
    } catch (e: any) {
      console.log("ERROR", e);
      const messageTag = isRead ? "unread" : "read";
      toast.errorToast(
        `Unable to mark the notification as ${messageTag}. Try again later`
      );
    } finally {
      _handleSetLoading(false);
      notificationMethods.handleOnRefetch();
    }
  };

  const handleOnChange = (
    key: INotificationStateKey,
    value: INotificationStateKeyValue
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));

    if (key === "source")
      return setState((prev) => ({ ...prev, currentPage: 1 }));
  };

  const isInvalidSearch = state.source !== "All" && !notificationState.count;

  const screenState = decideScreenStateToRender({
    isFetching: notificationState.isFetching,
    isInvalidSearch: isInvalidSearch,
    entriesLength: notificationState.notifications.length,
  });

  return (
    <NotificationsContext.Provider
      value={{
        state: {
          title: formatTitleWithCount(
            "Notifications",
            notificationState?.count
          ),
          activeSource: state?.source,
          isFetching: notificationState.isFetching,
          screenState: screenState,
          isLoading: state?.isLoading,
          currentPage: state?.currentPage,
          count: notificationState.count,
          totalPages: notificationState.totalPages,
          limit: LIMIT,
          notifications: notificationState.notifications,
          tagList: TAGS,
        },
        methods: {
          handleOnDelete: handleOnRemoveNotification,
          handleOnRead: handleOnMarkAsReadOrUnreadNotification,
          handleOnChange: handleOnChange,
        },
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationsContext);
};

interface INotificationContext {
  state: {
    title: string;
    activeSource: INotificationTag;
    currentPage: number;
    isFetching: boolean;
    screenState: IRenderOptionsOutput;
    isLoading: boolean;
    count: number;
    totalPages: number;
    limit: number;
    notifications: INotification[];
    tagList: string[];
  };
  methods: {
    handleOnRead: (id: string, isRead: boolean) => void;
    handleOnDelete: (id: string) => void;
    handleOnChange: (
      key: INotificationStateKey,
      value: INotificationStateKeyValue
    ) => void;
  };
}
