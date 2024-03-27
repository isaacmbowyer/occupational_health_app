import { VStack } from "@gluestack-ui/themed";
import { InputPassword } from "../../../../components/atoms/InputPassword";
import { Text } from "../../../../components/atoms/Text";

export const PasswordDetails = () => {
  return (
    <VStack space="xl">
      <Text.Regular color="gray">2. Password Details</Text.Regular>

      <InputPassword
        label="Password"
        value=""
        helpText=""
        onChange={(e) => console.log("password")}
      />

      <InputPassword
        label="Confirm Password"
        value=""
        helpText=""
        onChange={(e) => console.log("confirm password")}
      />
    </VStack>
  );
};
