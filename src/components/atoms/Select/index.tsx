import {
  FormControl,
  Select as GluestackSelect,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Icon,
} from "@gluestack-ui/themed";
import { ICONS } from "../../../data/icons";
import { IOption } from "../../../entities/IOption";
import { useState, useEffect } from "react";
import { Label } from "../Label";
import { LabelError } from "../LabelError";
import { getLabelFromValue } from "../../../utils/getLabelFromValue";

interface ISelectProps {
  value: string;
  label: string;
  items: IOption[];
  isDisabled?: boolean;
  helpText?: string;
}

export const Select = ({
  value,
  label,
  items,
  isDisabled = false,
  helpText,
}: ISelectProps) => {
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (!helpText) {
      setIsTouched(false);
      return;
    }
  }, [isTouched]);

  const isTouchedAndHasHelpText = isTouched && helpText;

  const handleOnChange = (e) => {
    setIsTouched(true);
    console.log(e);
  };

  return (
    <FormControl isReadOnly={isDisabled} isInvalid={!!helpText}>
      <Label>{label}</Label>
      <GluestackSelect>
        <SelectTrigger variant="underlined" size="sm">
          <SelectInput
            placeholder="Select"
            value={getLabelFromValue(items, value)}
            onChange={handleOnChange}
          />
          <SelectIcon mr="$3">
            <Icon as={ICONS.CHEVRON} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {items.map((item) => (
              <SelectItem
                label={item.label}
                value={item.value}
                key={item.value}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </GluestackSelect>
      {isTouchedAndHasHelpText && <LabelError>{helpText}</LabelError>}
    </FormControl>
  );
};
