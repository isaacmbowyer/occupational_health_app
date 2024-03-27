import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../../../components/atoms/Text";
import { Input } from "../../../../components/atoms/Input";
import { DatePicker } from "../../../../components/atoms/DatePicker";
import { Select } from "../../../../components/atoms/Select";
import { ICONS } from "../../../../data/icons";
import { useState } from "react";

export const PersonalDetails = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <VStack space="xl">
      <VStack>
        <Text.Regular color="gray">1. Personal Details</Text.Regular>
      </VStack>

      <Input
        label="First Name"
        value=""
        helpText=""
        onChange={(e) => {
          console.log(e.nativeEvent.text);
        }}
      />

      <Input
        label="Last Name"
        value=""
        helpText=""
        onChange={(e) => {
          console.log(e.nativeEvent.text);
        }}
      />

      <DatePicker label="Date of Birth" date={date} onChange={onChange} />

      <Select
        value=""
        label="Gender"
        items={[
          { label: "Male", value: "1" },
          { label: "Female", value: "2" },
          { label: "Other", value: "3" },
        ]}
      />

      <Input
        label="Email"
        value=""
        helpText=""
        icon={ICONS.EMAIL}
        onChange={(e) => {
          console.log(e.nativeEvent.text);
        }}
      />
    </VStack>
  );
};
