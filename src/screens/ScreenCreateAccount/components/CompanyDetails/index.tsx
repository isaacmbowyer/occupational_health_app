import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../../../components/atoms/Text";
import { Input } from "../../../../components/atoms/Input";
import { Select } from "../../../../components/atoms/Select";
import {
  ICreateAccountStateKey,
  ICreateAccountStateKeyValue,
  useCreateAccount,
} from "../../hooks";
import { IOption } from "../../../../entities/IOption";

interface ICompanyDetailsProps {
  name: string;
  countryId: number;
  industryId: number;
  nameError: string;
  countryOptions: IOption[];
  industryOptions: IOption[];
  handleOnChange: (
    key: ICreateAccountStateKey,
    value: ICreateAccountStateKeyValue
  ) => void;
}

export const CompanyDetails = ({
  name,
  countryId,
  industryId,
  nameError,
  countryOptions,
  industryOptions,
  handleOnChange,
}: ICompanyDetailsProps) => {
  return (
    <VStack space="xl">
      <Text.Regular color="gray">3. Company Details</Text.Regular>

      <Input
        label="Name"
        value={name}
        helpText={nameError}
        onChange={(e) => handleOnChange("companyName", e.nativeEvent.text)}
      />

      <Select
        selectedOption={countryId}
        label="Country"
        items={countryOptions}
        onChange={(value) => handleOnChange("country", value)}
      />

      <Select
        selectedOption={industryId}
        label="Industry"
        items={industryOptions}
        onChange={(value) => handleOnChange("industry", value)}
      />
    </VStack>
  );
};
