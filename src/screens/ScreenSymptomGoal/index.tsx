import { Divider, VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { SymptomGoalProvider, useSymptomGoalContext } from "./context";
import { OverallProgressCard } from "../../components/modules/OverallProgressCard";
import { Accordion } from "../../components/atoms/Accordion";
import { Select } from "../../components/atoms/Select";
import { DatePicker } from "../../components/atoms/DatePicker";

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
                targetSeverity={+state?.targetSeverity?.name}
                daysLeft={state?.daysLeft}
              />
            }
          />

          <Divider my="$0.5" />

          <Accordion
            title="Options"
            hiddenSection={
              <VStack width="$full" space="xl">
                <Select
                  selectedOption={state?.targetSeverity}
                  label="Target Score"
                  items={state?.severityList}
                  onChange={(value) =>
                    methods.handleOnChange("targetSeverity", value)
                  }
                />

                <DatePicker
                  label="Target Date"
                  date={state?.targetDate}
                  onChange={(event, newDate) =>
                    methods.handleOnChange("targetDate", newDate)
                  }
                  maxDate={new Date()}
                />
              </VStack>
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
