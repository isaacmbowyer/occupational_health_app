import { Icon, InfoIcon, Pressable } from "@gluestack-ui/themed";
import { IColor } from "../../../entities/IColor";

interface IIconButtonProps {
  handleOnPress: () => void;
  icon: any;
  color?: IColor;
}

const Medium = ({ handleOnPress, icon, color = "black" }: IIconButtonProps) => {
  return (
    <Pressable onPress={handleOnPress}>
      <Icon as={icon} size="md" color={color} />
    </Pressable>
  );
};

const Large = ({ handleOnPress, icon, color = "black" }: IIconButtonProps) => {
  return (
    <Pressable onPress={handleOnPress}>
      <Icon as={icon} size="lg" color={color} />
    </Pressable>
  );
};

export const IconButton = {
  Medium,
  Large,
};
