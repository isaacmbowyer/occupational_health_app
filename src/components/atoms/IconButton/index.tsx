import { Icon, Pressable } from "@gluestack-ui/themed";
import { IColor } from "../../../entities/IColor";

interface IIconButtonProps {
  handleOnPress: () => void;
  icon: any;
  color?: IColor;
  fill?: IColor;
}

const Medium = ({
  handleOnPress,
  icon,
  color = "black",
  fill,
}: IIconButtonProps) => {
  return (
    <Pressable onPress={handleOnPress}>
      <Icon as={icon} size="md" color={color} fill={fill} />
    </Pressable>
  );
};

const Large = ({
  handleOnPress,
  icon,
  color = "black",
  fill,
}: IIconButtonProps) => {
  return (
    <Pressable onPress={handleOnPress}>
      <Icon as={icon} size="lg" color={color} fill={fill} />
    </Pressable>
  );
};

export const IconButton = {
  Medium,
  Large,
};
