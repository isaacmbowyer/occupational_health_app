import { VStack } from "@gluestack-ui/themed";
import { IUserSymptom } from "../../../entities/IUserSymptom";
import { UserSymptomCard } from "../../modules/UserSymptomCard";

interface IUserSymptomsContainer {
  items: IUserSymptom[];
  handleOnView: (symptom: IUserSymptom) => void;
  handleOnDelete: (id: string) => void;
}

export const UserSymptomsContainer = ({
  items,
  handleOnView,
  handleOnDelete,
}: IUserSymptomsContainer) => {
  return (
    <VStack space="md" width="$full">
      {items?.map((item) => (
        <UserSymptomCard
          key={item?.id}
          label={item?.name}
          severityType={item?.severityType}
          imageUri={item?.imageUri}
          targetDate={item?.targetDate}
          handleOnDelete={() => handleOnDelete(item?.id)}
          handleOnView={() => handleOnView(item)}
        />
      ))}
    </VStack>
  );
};