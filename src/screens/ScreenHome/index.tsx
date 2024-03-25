import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../components/atoms/Text";
import { PublicTemplateContainer } from "../../components/templates/PublicTemplateContainer";
import { HomePageActions } from "../../components/modules/HomePageActions";

export const HomeScreen = ({ navigation }) => {
  return (
    <PublicTemplateContainer
      mainSection={
        <VStack flex={1} alignItems="center" width="$full">
          <Text.Regular textAlign="center" color="gray" bold>
            Self-manage your Long-COVID Symptoms for a smoother reintegration to
            the workplace
          </Text.Regular>

          <HomePageActions />
        </VStack>
      }
    />
  );
};
