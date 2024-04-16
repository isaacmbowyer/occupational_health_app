import { VStack } from "@gluestack-ui/themed";
import { IUserSymptom } from "../../../entities/IUserSymptom";
import { SymptomCardContainer } from "../../modules/SymptomCardContainer";

interface ISymptomContainer {
  items: IUserSymptom[];
  isLoading: boolean;
  handleOnView: (symptom: IUserSymptom) => void;
  handleOnDelete: (symptom: IUserSymptom) => void;
}

export const SymptomContainer = ({
  items,
  isLoading,
  handleOnView,
  handleOnDelete,
}: ISymptomContainer) => {
  return (
    <VStack space="md" width="$full">
      {items?.map((item) => (
        <SymptomCardContainer
          key={item?.id}
          name={item?.name}
          currentSeverity={item?.currentSeverity}
          targetSeverity={item?.targetSeverity}
          isLoading={isLoading}
          severityType={item?.severityType}
          imageUri={item?.imageUri}
          targetDate={item?.targetDate}
          handleOnDelete={() => handleOnDelete(item)}
          handleOnView={() => handleOnView(item)}
        />
      ))}
    </VStack>
  );
};
