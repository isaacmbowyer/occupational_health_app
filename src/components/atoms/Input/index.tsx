import {
  FormControl,
  InputField,
  InputIcon,
  VStack,
} from "@gluestack-ui/themed";
import { Input as GluestackInput } from "@gluestack-ui/themed";
import { Label } from "../Label";
import { InputSlot } from "@gluestack-ui/themed";
import { LabelError } from "../LabelError";

interface IInputProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
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
  return (
    <VStack space="xs">
      <FormControl isDisabled={isDisabled} isInvalid={!!helpText}>
        <Label>{label}</Label>

        <GluestackInput variant="underlined">
          <InputField type="text" value={value} onChange={onChange} />

          {icon && (
            <InputSlot pr="$3">
              <InputIcon as={icon} />
            </InputSlot>
          )}
        </GluestackInput>

        <LabelError>{helpText}</LabelError>
      </FormControl>
    </VStack>
  );
};
