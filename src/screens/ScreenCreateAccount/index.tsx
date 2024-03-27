import { VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { DatePicker } from "../../components/atoms/DatePicker";
import { Text } from "../../components/atoms/Text";
import { PublicTemplateContainer } from "../../components/templates/PublicTemplateContainer";
import { Input } from "../../components/atoms/Input";
import { ICONS } from "../../data/icons";

export const CreateAccountScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <PublicTemplateContainer
      scrollable
      mainSection={
        <VStack>
          <VStack space="xs" marginBottom="$1">
            <Text.Header color="sky_blue">Create Account</Text.Header>
          </VStack>

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
        </VStack>
      }
    />
  );
};
