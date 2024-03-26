import { ReactNode } from "react";
import { IColor } from "../../../entities/IColor";
import { Text } from "../Text";

interface ILabelProps {
  color: IColor;
  children: ReactNode;
}

export const Label = ({ color, children }: ILabelProps) => {
  return <Text.ExtraSmall color={color}>{children}</Text.ExtraSmall>;
};
