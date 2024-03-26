import { InputField, InputIcon, VStack } from "@gluestack-ui/themed";
import { Input as GluestackInput } from "@gluestack-ui/themed";
import { Label } from "../Label";
import { InputSlot } from "@gluestack-ui/themed";
import { useState } from "react";
import { ICONS } from "../../../data/icons";
import { FormControl } from "@gluestack-ui/themed";
import { LabelError } from "../LabelError";

interface IInputPasswordProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
  isDisabled?: boolean;
  helpText?: string;
}

export const InputPassword = ({
  label,
  value,
  onChange,
  helpText,
  isDisabled = false,
}: IInputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <VStack width="$full" space="xs">
      <FormControl isDisabled={isDisabled} isInvalid={!!helpText}>
        <Label>{label}</Label>

        <GluestackInput variant="underlined">
          <InputField
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e)}
          />

          <InputSlot pr="$3" onPress={handleShowPassword}>
            <InputIcon as={showPassword ? ICONS.EYE : ICONS.EYE_OFF} />
          </InputSlot>
        </GluestackInput>

        <LabelError>{helpText}</LabelError>
      </FormControl>
    </VStack>
  );
};
