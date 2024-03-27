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
        value=""
        label="Country"
        items={[
          { label: "United Kingdom", value: "1" },
          { label: "United States", value: "2" },
          { label: "France", value: "3" },
        ]}
      />

      <Select
        value=""
        label="Industry"
        items={[
          { label: "Legal", value: "1" },
          { label: "Lesiure/Toursim", value: "2" },
          { label: "Gaming", value: "3" },
        ]}
      />
    </VStack>
  );
};
