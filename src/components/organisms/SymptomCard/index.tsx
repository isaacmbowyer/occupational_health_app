import { HStack, VStack, Image } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import { ISeverityType } from "../../../entities/ISeverityType";

interface ISymptomCardProps {
  label: string;
  severityType: ISeverityType;
  imageName: string;
  targetDate: Date;
  handleOnDelete: () => void;
  handleOnView: () => void;
}

export const SymptomCard = () => {
  return (
    <VStack
      borderColor={colors.black}
      borderWidth="$1"
      backgroundColor={colors.white}
      padding="$4"
      width="$full"
    >
      <HStack width="$full" justifyContent="space-between" alignItems="center">
        <Image
          size="md"
          borderRadius={0}
          source={{
            uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          }}
        />
      </HStack>
    </VStack>
  );
};
