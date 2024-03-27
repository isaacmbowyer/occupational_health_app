import { Input } from "../Input";
import { ICONS } from "../../../data/icons";
import { Pressable } from "@gluestack-ui/themed";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { formatDate } from "../../../utils/formatDate";

interface IDatePicker {
  label: string;
  date: Date;
  onChange: (e, selectedDate) => void;
}

export const DatePicker = ({ label, date, onChange }: IDatePicker) => {
  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  return (
    <Pressable onPress={showDatepicker}>
      <Input
        label={label}
        value={formatDate(date)}
        icon={ICONS.CALANDER}
        isDisabled={true}
      />
    </Pressable>
  );
};
