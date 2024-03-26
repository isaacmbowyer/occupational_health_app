import { InputField, InputIcon, VStack } from "@gluestack-ui/themed";
import { Input as GluestackInput } from "@gluestack-ui/themed";
import { Label } from "../Label";
import { InputSlot } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";

interface IInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  icon?: any;
  helpText?: string;
}

export const Input = ({
  label,
  value,
  onChange,
  icon,
  helpText,
  isDisabled = false,
}: IInputProps) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e: any) => {
    setIsTouched(true);
    onChange(e.target.value);
  };

  const isTouchedAndHasHelpText = isTouched && helpText;

  return (
    <VStack space="xs">
      <Label color="gray">{label}</Label>

      <GluestackInput
        variant="underlined"
        size="md"
        isDisabled={isDisabled}
        isInvalid={!!helpText}
      >
        <InputField
          type="text"
          value={value}
          onChange={(e) => handleChange(e)}
        />

        {icon && (
          <InputSlot pr="$3">
            <InputIcon as={icon} />
          </InputSlot>
        )}
      </GluestackInput>

      {isTouchedAndHasHelpText && <Label color="gray">{helpText}</Label>}
    </VStack>
  );
};
