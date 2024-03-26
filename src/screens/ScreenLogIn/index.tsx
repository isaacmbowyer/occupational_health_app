import { VStack } from "@gluestack-ui/themed";
import { PublicTemplateContainer } from "../../components/templates/PublicTemplateContainer";
import { Text } from "../../components/atoms/Text";

export const LogInScreen = ({ navigation }) => {
  return (
    <PublicTemplateContainer
      mainSection={
        <VStack flex={1} width="$full">
          <VStack space="xs">
            <Text.Header color="sky_blue">Log In</Text.Header>
            <Text.Regular color="gray">
              Enter your credentials below
            </Text.Regular>
          </VStack>
        </VStack>
      }
    />
  );
};
