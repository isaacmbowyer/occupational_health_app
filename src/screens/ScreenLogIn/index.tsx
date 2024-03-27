import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../components/atoms/Text";
import { PublicTemplateContainer } from "../../components/templates/PublicTemplateContainer";
import { Input } from "../../components/atoms/Input";
import { ICONS } from "../../data/icons";
import { InputPassword } from "../../components/atoms/InputPassword";
import { Button } from "../../components/atoms/Button";
import { HStack } from "@gluestack-ui/themed";
import { Link } from "../../components/atoms/Link";

export const LogInScreen = ({ navigation }) => {
  return (
    <PublicTemplateContainer
      mainSection={
        <VStack>
          <VStack space="xs" marginBottom="$8">
            <Text.Header color="sky_blue">Log In</Text.Header>
            <Text.Regular color="gray">
              Enter your credentials below
            </Text.Regular>
          </VStack>

          <VStack space="xl">
            <Input
              label="Email"
              value="text"
              icon={ICONS.EMAIL}
              helpText=""
              onChange={(e) => console.log(e.nativeEvent.text)}
              isDisabled={false}
            />

            <InputPassword
              label="Password"
              value="test"
              helpText=""
              onChange={(e) => console.log(e.nativeEvent.text)}
              isDisabled={false}
            />

            <Button.Solid
              text="Log In"
              onPress={() => console.log("Submitted")}
              isDisabled={false}
            />
          </VStack>

          <VStack
            alignItems="center"
            justifyContent="center"
            marginTop="$1"
            space="md"
          >
            <HStack width="$full" alignItems="center" justifyContent="center">
              <Text.Small color="gray">Forgot your credentials? </Text.Small>
              <Link.Small
                bold
                label="Reset Password"
                screen="Home"
              ></Link.Small>
            </HStack>
            <Link.Regular label="Return to Home" screen="Home"></Link.Regular>
          </VStack>
        </VStack>
      }
    />
  );
};
