import { Text } from "../../components/atoms/Text";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";

export const SymptomGoalScreen = ({ route, navigation }) => {
  const parms = route?.params;

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={<Text.Regular>Hellooo</Text.Regular>}
    />
  );
};
