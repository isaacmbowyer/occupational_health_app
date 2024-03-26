import { Input as GluestackInput } from "@gluestack-ui/themed";

interface IInputProps {
  label: string;
  icon?: any;
  helpText?: string;
}

export const Input = ({ label, icon, helpText }: IInputProps) => {
  return <GluestackInput></GluestackInput>;
};
