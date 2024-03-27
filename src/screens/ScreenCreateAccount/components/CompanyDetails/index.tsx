import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../../../components/atoms/Text";
import { Input } from "../../../../components/atoms/Input";
import { Select } from "../../../../components/atoms/Select";

export const CompanyDetails = () => {
  return (
    <VStack space="xl">
      <Text.Regular color="gray">3. Company Details</Text.Regular>

      <Input
        label="Name"
        value=""
        helpText=""
        onChange={(e) => {
          console.log(e.nativeEvent.text);
        }}
      />

      <Select
        selectedOption=""
        label="Country"
        items={[
          { name: "United Kingdom", id: "1" },
          { name: "United States", id: "2" },
          { name: "France", id: "3" },
        ]}
      />

      <Select
        selectedOption=""
        label="Industry"
        items={[
          { name: "Legal", id: "1" },
          { name: "Lesiure/Toursim", id: "2" },
          { name: "Gaming", id: "3" },
        ]}
      />
    </VStack>
  );
};
