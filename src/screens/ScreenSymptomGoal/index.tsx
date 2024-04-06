import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { SymptomGoalProvider, useSymptomGoalContext } from "./context";
import { OverallProgressCard } from "../../components/modules/OverallProgressCard";
import { Accordion } from "../../components/atoms/Accordion";

const SymptomGoal = () => {
  const { state, methods } = useSymptomGoalContext();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack>
          <MainHeader title={state?.title} isFetching={state?.isFetching} />
          <Accordion
            title="Overall Progress"
            hiddenSection={
              <OverallProgressCard
                currentSeverity={state?.currentSeverity}
                targetSeverity={state?.targetSeverity}
                daysLeft={state?.daysLeft}
              />
            }
          />
        </VStack>
      }
    />
  );
};

export const SymptomGoalScreen = ({ navigation }) => {
  return (
    <SymptomGoalProvider>
      <SymptomGoal />
    </SymptomGoalProvider>
  );
};
