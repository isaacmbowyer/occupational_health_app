import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { NotificationsSection } from "./components/NotificationsSection";
import { NotificationsProvider, useNotificationContext } from "./context";

const Notifications = () => {
  const { state, methods } = useNotificationContext();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack space="xl">
          <MainHeader title={state?.title} isFetching={state?.isFetching} />

          <NotificationsSection
            totalPages={state?.totalPages}
            currentPage={state?.currentPage}
            count={state?.count}
            limit={state?.limit}
            notifications={state?.notifications}
            isFetching={state?.isFetching}
            tagList={state?.tagList}
            source={state?.activeSource}
            handleOnRemove={methods?.handleOnDelete}
            handleOnMarkAsReadOrUnread={methods?.handleOnRead}
            handleOnChange={methods?.handleOnChange}
          />
        </VStack>
      }
    />
  );
};

export const NotificationsScreen = () => {
  return (
    <NotificationsProvider>
      <Notifications />
    </NotificationsProvider>
  );
};
