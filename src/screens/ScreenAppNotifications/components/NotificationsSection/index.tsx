import { VStack } from "@gluestack-ui/themed";
import { IllustrationStateEmpty } from "../../../../components/modules/IllustrationState.Empty";
import { SubHeaderWithTags } from "../../../../components/modules/SubHeaderWithTags";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { IllustrationInvalidSearch } from "../../../../components/modules/IllustrationState.InvalidSearch";
import { INotification } from "../../../../entities/INotification";
import { NotificationContainer } from "../../../../components/organisms/NotificationContainer";
import { NotificationSkeleton } from "../../../../components/modules/NotificationSkeleton";

type INotificationStateKey = "source" | "currentPage";
type INotificationStateKeyValue = number | string;

interface INotificationsSectionProps {
  totalPages: number;
  currentPage: number;
  count: number;
  limit: number;
  notifications: INotification[];
  isFetching: boolean;
  tagList: string[];
  source: string;
  handleOnRemove: (id: string) => void;
  handleOnMarkAsReadOrUnread: (id: string, isRead: boolean) => void;
  handleOnChange: (
    key: INotificationStateKey,
    value: INotificationStateKeyValue
  ) => void;
}

export const NotificationsSection = ({
  totalPages,
  currentPage,
  count,
  limit,
  isFetching,
  tagList,
  source,
  notifications,
  handleOnRemove,
  handleOnMarkAsReadOrUnread,
  handleOnChange,
}: INotificationsSectionProps) => {
  if (!notifications.length && !isFetching)
    return (
      <>
        <SubHeaderWithTags
          pageCount={totalPages}
          currentPage={currentPage}
          entriesCount={count}
          currentEntries={notifications.length}
          isFetching={isFetching}
          label="notifications"
          tagList={tagList}
          activeSource={source}
          handleOnChange={(val) => handleOnChange("source", val)}
        />

        {source == "All" ? (
          <IllustrationStateEmpty
            message={`You dont have any notifications yet.`}
          />
        ) : (
          <IllustrationInvalidSearch loadWhat="notifications" />
        )}
      </>
    );

  return (
    <VStack>
      <SubHeaderWithTags
        pageCount={totalPages}
        currentPage={currentPage}
        entriesCount={count}
        currentEntries={notifications.length}
        isFetching={isFetching}
        label="notifications"
        tagList={tagList}
        activeSource={source}
        handleOnChange={(val) => handleOnChange("source", val)}
      />

      {isFetching ? (
        <VStack space="md">
          <NotificationSkeleton />
          <NotificationSkeleton />
        </VStack>
      ) : (
        <>
          <NotificationContainer
            notifications={notifications}
            handleOnMarkReadOrUnread={handleOnMarkAsReadOrUnread}
            handleOnRemove={handleOnRemove}
          />

          <Pagination
            totalItems={count}
            pageSize={limit}
            currentPage={currentPage}
            onPageChange={(newPage) => handleOnChange("currentPage", newPage)}
          />
        </>
      )}
    </VStack>
  );
};
