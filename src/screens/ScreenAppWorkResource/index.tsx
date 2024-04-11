import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";

export const WorkResourceScreen = () => {
  return (
    <PrivateTemplateContainer
      mainSection={
        <VStack space="xl">
          <MainHeader title="Work Resource" isFetching={false} />
        </VStack>
      }
    />
  );
};
