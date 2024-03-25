import { ButtonIcon, ButtonText } from "@gluestack-ui/themed";
import { Button as GluestackButton } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import { IColor } from "../../../entities/IColor";

interface IButtonProps {
  text: string;
  onPress: () => void;
  isDisabled?: boolean;
  color?: IColor;
  icon?: any;
}

const ButtonSolid = ({
  text,
  onPress,
  isDisabled = false,
  color = "sky_blue",
  icon,
}: IButtonProps) => {
  return (
    <GluestackButton
      size="xl"
      variant="solid"
      borderRadius="$full"
      backgroundColor={colors[color]}
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
  color = "sky_blue",
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
      borderColor={colors[color]}
      onPress={onPress}
    >
      <ButtonText width="95%" textAlign="center" color={colors[color]}>
        {text}
      </ButtonText>

      {icon && <ButtonIcon as={icon} color={colors[color]} />}
    </GluestackButton>
  );
};

export const Button = {
  Solid: ButtonSolid,
  Outline: ButtonOutline,
};
