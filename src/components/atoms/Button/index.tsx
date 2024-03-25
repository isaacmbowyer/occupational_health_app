import { ButtonIcon, ButtonText } from "@gluestack-ui/themed";
import { Button as GluestackButton } from "@gluestack-ui/themed";
import { COLORS } from "../../../data/colors";
import { ReactNode } from "react";

interface IButtonProps {
  text: string;
  onPress: () => void;
  isDisabled?: boolean;
  color?: "SKY_BLUE";
  icon?: any;
}

const ButtonSolid = ({
  text,
  onPress,
  isDisabled = false,
  color = "SKY_BLUE",
  icon,
}: IButtonProps) => {
  return (
    <GluestackButton
      size="xl"
      variant="solid"
      borderRadius="$full"
      backgroundColor={COLORS[color]}
      isDisabled={isDisabled}
      isFocusVisible={false}
      width="$full"
      onPress={onPress}
      justifyContent="space-between"
    >
      <ButtonText width="95%" textAlign="center">
        {text}
      </ButtonText>
      {icon && <ButtonIcon as={icon} />}
    </GluestackButton>
  );
};

const ButtonOutline = ({
  text,
  onPress,
  isDisabled = false,
  color = "SKY_BLUE",
  icon,
}: IButtonProps) => {
  return (
    <GluestackButton
      size="xl"
      variant="solid"
      borderRadius="$full"
      backgroundColor="transparent"
      isDisabled={isDisabled}
      isFocusVisible={false}
      width="$full"
      borderWidth="$1"
      borderColor={COLORS[color]}
      onPress={onPress}
    >
      <ButtonText width="95%" textAlign="center" color={COLORS[color]}>
        {text}
      </ButtonText>

      {icon && <ButtonIcon as={icon} color={COLORS[color]} />}
    </GluestackButton>
  );
};

export const Button = {
  Solid: ButtonSolid,
  Outline: ButtonOutline,
};
