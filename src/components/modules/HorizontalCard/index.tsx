import { HStack, VStack } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import { Image } from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";
import { Button } from "../../atoms/Button";
import { ICONS } from "../../../data/icons";

interface IHorizitonalCardProps {
  label: string;
  buttonLabel: string;
  description: string;
  image: any;
  icon?: any;
  isLoading?: boolean
  handleOnPress: () => void;
}

export const HorizitonalCard = ({
  label,
  description,
  image,
  buttonLabel,
  icon,
  isLoading = false
  handleOnPress,
}: IHorizitonalCardProps) => {
  return (
    <HStack
      borderColor={colors.black}
      borderWidth="$1"
      borderRadius="$md"
      backgroundColor={colors.white}
      padding="$4"
      width="$full"
      hardShadow="5"
      space="xl"
      alignItems="center"
    >
      <Image
        size="lg"
        borderRadius={10}
        source={image}
        alt={`${label} Card Image`}
      />

      <VStack space="xs" width={200}>
        <Text.Small bold>{label}</Text.Small>
        <Text.Small color="gray">{description}</Text.Small>
        <HStack justifyContent="flex-end" marginRight="$8">
          <HStack style={{ width: 105 }}>
            <Button.Outline
              text={buttonLabel}
              onPress={handleOnPress}
              icon={icon && icon}
              isLoading={isLoading}
            ></Button.Outline>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
};
