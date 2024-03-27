import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../components/atoms/Text";
import { PublicTemplateContainer } from "../../components/templates/PublicTemplateContainer";
import { PersonalDetails } from "./components/PersonalDetails";

export const CreateAccountScreen = ({ navigation }) => {
  return (
    <PublicTemplateContainer
      scrollable
      mainSection={
        <VStack>
          <VStack space="xs" marginBottom="$1">
            <Text.Header color="sky_blue">Create Account</Text.Header>
          </VStack>

          <PersonalDetails />
        </VStack>
      }
    />
  );
};
