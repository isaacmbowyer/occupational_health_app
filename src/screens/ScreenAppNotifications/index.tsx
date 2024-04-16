import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { NotificationCard } from "../../components/modules/NotificationCard";

export const NotificationsScreen = () => {
  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack space="xl">
          <MainHeader title="Notifications" isFetching={false} />

          <NotificationCard
            title="Added New Symptom"
            subTitle="You added “Difficulty Sleeping (Insomnia)” to your Tracked Symptoms list"
            isRead={false}
          />
        </VStack>
      }
    />
  );
};
