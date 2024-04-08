import { VStack } from "@gluestack-ui/themed";
import { Accordion } from "../../../../components/atoms/Accordion";
import { ISymptom } from "../../../../entities/ISymptom";
import { IAddSymptomStateKey } from "../../../../entities/IAddSymptomStateKey";
import { IAddSymptomStateKeyValue } from "../../../../entities/IAddSymptomStateKeyValue";
import { Input } from "../../../../components/atoms/Input";
import { ICONS } from "../../../../data/icons";
import { AddSymptomContainer } from "../../../../components/organisms/AddSymptomContainer";

interface ISelectSymptomSectionProps {
  symptoms: ISymptom[];
  selectedSymptom: ISymptom;
  isFetching: boolean;
  search: string;
  handleOnChange: (
    key: IAddSymptomStateKey,
    value: IAddSymptomStateKeyValue
  ) => void;
  handleOnSelect: (item: ISymptom) => void;
}

export const SelectSymptomSection = ({
  symptoms,
  selectedSymptom,
  isFetching,
  search,
  handleOnChange,
  handleOnSelect,
}: ISelectSymptomSectionProps) => {
  return (
    <VStack>
      <Accordion
        title="Select a Symptom"
        isDisabled={isFetching}
        hiddenSection={
          <VStack space="md">
            <Input
              label="Search"
              placeholder="Search..."
              type="rounded"
              value={search}
              icon={ICONS.SEARCH}
              onChange={(e) => handleOnChange("search", e.nativeEvent.text)}
            />

            <AddSymptomContainer
              symptoms={symptoms}
              selectedSymptom={selectedSymptom}
              handleOnSelect={handleOnSelect}
            />
          </VStack>
        }
      />
    </VStack>
  );
};
