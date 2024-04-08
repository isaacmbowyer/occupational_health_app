import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { AddSymptomProvider, useAddSymptomContext } from "./context";
import { SelectSymptomSection } from "./components/SelectSymptomSection";

const AddSymptom = () => {
  const { state, methods } = useAddSymptomContext();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack>
          <MainHeader title="Add Symptom" isFetching={state?.isFetching} />

          <SelectSymptomSection
            symptoms={state?.symptomList}
            selectedSymptom={state?.selectedSymptom}
            isFetching={state?.isFetching}
            search={state?.search}
            handleOnChange={methods?.handleOnChange}
            handleOnSelect={methods?.handleOnSelect}
          />
        </VStack>
      }
    />
  );
};
export const AddSymptomScreen = ({ navigation }) => {
  return (
    <AddSymptomProvider>
      <AddSymptom />
    </AddSymptomProvider>
  );
};
