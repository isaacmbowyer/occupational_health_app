import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../components/atoms/Text";
import { PublicTemplateContainer } from "../../components/templates/PublicTemplateContainer";
import { PersonalDetails } from "./components/PersonalDetails";
import { PasswordDetails } from "./components/PasswordDetails";
import { CompanyDetails } from "./components/CompanyDetails";
import { Link } from "../../components/atoms/Link";
import { Button } from "../../components/atoms/Button";

export const CreateAccountScreen = ({ navigation }) => {
  return (
    <PublicTemplateContainer
      scrollable
      mainSection={
        <VStack space="md">
          <Text.Header color="sky_blue">Create Account</Text.Header>

          <PersonalDetails />

          <PasswordDetails />

          <CompanyDetails />

          <Button.Solid
            text="Create Account"
            onPress={() => console.log("hello")}
            isDisabled={false}
          />

          <VStack alignItems="center" justifyContent="center" mb="$4">
            <Link.Regular label="Return to Home" screen="Home"></Link.Regular>
          </VStack>
        </VStack>
      }
    />
  );
};
