import {
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlError,
} from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { ICONS } from "../../../data/icons";

interface ILabelErrorProps {
  children: ReactNode;
}

export const LabelError = ({ children }: ILabelErrorProps) => {
  return (
    <FormControlError>
      <FormControlErrorIcon as={ICONS.ALERT} />
      <FormControlErrorText width={310}>{children}</FormControlErrorText>
    </FormControlError>
  );
};
