import { Divider, VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { SymptomGoalProvider, useSymptomGoalContext } from "./context";
import { OverallProgressCard } from "../../components/modules/OverallProgressCard";
import { Accordion } from "../../components/atoms/Accordion";
import { Select } from "../../components/atoms/Select";
import { DatePicker } from "../../components/atoms/DatePicker";
import { Chart } from "../../components/atoms/Chart";
import { Text } from "../../components/atoms/Text";
import { Button } from "../../components/atoms/Button";

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

          {state?.averageScores?.length ? (
            <VStack>
              <Accordion
                title="Chart View"
                hiddenSection={
                  <VStack>
                    <Chart scores={state?.averageScores} />
                    <Text.Regular color="gray" fontStyle="italic">
                      The chart plots data from the latest daily reports over
                      the past four months, calculating the average severity
                      rating for each month.
                    </Text.Regular>
                  </VStack>
                }
              />

              <Divider my="$0.5" />
            </VStack>
          ) : null}

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

          <Divider my="$0.5" />

          <Button.Solid
            text="Track Symptom Progress"
            onPress={methods.handleOnPress}
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
