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
  SelectScrollView,
  Icon,
} from "@gluestack-ui/themed";
import { ICONS } from "../../../data/icons";
import { IOption } from "../../../entities/IOption";
import { useState, useEffect } from "react";
import { Label } from "../Label";
import { LabelError } from "../LabelError";
import { getOptionName } from "../../../utils/getOptionName";
import { SelectFlatList } from "@gluestack-ui/themed";

interface ISelectProps {
  selectedOption: number;
  label: string;
  items: IOption[];
  isDisabled?: boolean;
  helpText?: string;
  onChange: (value: string) => void;
}

export const Select = ({
  onChange,
  selectedOption,
  label,
  items,
  isDisabled = false,
  helpText,
}: ISelectProps) => {
  const defaultValue = getOptionName(items, selectedOption);

  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (!helpText) {
      setIsTouched(false);
      return;
    }
  }, [isTouched]);

  const isTouchedAndHasHelpText = isTouched && helpText;

  return (
    <FormControl isReadOnly={isDisabled} isInvalid={!!helpText}>
      <Label>{label}</Label>
      <GluestackSelect selectedValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger variant="underlined" size="sm">
          <SelectInput placeholder="Select" />
          <SelectIcon mr="$3">
            <Icon as={ICONS.CHEVRON} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectScrollView maxHeight="200px">
              {items.map((item) => (
                <SelectItem
                  label={item.name}
                  value={item.id.toString()}
                  key={item.id}
                />
              ))}
            </SelectScrollView>
          </SelectContent>
        </SelectPortal>
      </GluestackSelect>
      {isTouchedAndHasHelpText && <LabelError>{helpText}</LabelError>}
    </FormControl>
  );
};
