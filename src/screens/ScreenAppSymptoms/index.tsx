import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { TrackedSymptomsProvider, useTrackedSymptomsContext } from "./context";
import { UserSymptomSkeleton } from "../../components/organisms/UserSymptomSkeleton";
import { UserSymptomsContainer } from "../../components/organisms/UserSymptomsContainer";
import { ICONS } from "../../data/icons";
import { Button } from "../../components/atoms/Button";
import { AdvancedSearch } from "../../components/organisms/AdvancedSearch";
import { HeaderWithSearch } from "../../components/organisms/HeaderWithSearch";
import { SubHeader } from "../../components/organisms/SubHeader";

const Symptoms = () => {
  const { state, methods } = useTrackedSymptomsContext();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack>
          <HeaderWithSearch
            title="Long-Covid Symptoms"
            count={4}
            search={{
              isSearchActive: state?.isSearchActive,
              handleOnSearch: methods.handleToggleSearch,
            }}
            symptomSource={{
              active: state?.source,
              handleOnChange: (val) => methods.handleOnChange("source", val),
            }}
            isFetching={state?.isFetching}
            tagList={state?.tagList}
          />

          {state?.isSearchActive ? (
            <AdvancedSearch
              state={{
                symptom: state?.symptom,
                severityType: state?.severityType,
                targetRating: state?.targetRating,
                currentRating: state?.currentRating,
                targetDate: state?.targetDate,
                ratingList: state?.ratingOptions,
                severityList: state?.severityTypeOptions,
              }}
              methods={{
                handleOnChange: methods.handleSetSearch,
              }}
            />
          ) : null}

          <SubHeader
            pageCount={state?.totalPages}
            currentPage={state?.currentPage}
            entriesCount={state?.count}
            currentEntries={state?.symptoms?.length}
            isFetching={state?.isFetching}
            label="symptoms"
          />

          {state.isFetching ? (
            <VStack space="md">
              <UserSymptomSkeleton />
              <UserSymptomSkeleton />
            </VStack>
          ) : null}

          {state?.symptoms?.length && !state?.isFetching ? (
            <>
              <UserSymptomsContainer
                items={state?.symptoms}
                handleOnDelete={methods?.handleOnDelete}
                handleOnView={methods.handleOnPress}
              />
              <Pagination
                totalItems={state?.count}
                pageSize={state?.limit}
                currentPage={state?.currentPage}
                onPageChange={(newPage) =>
                  methods.handleOnChange("currentPage", newPage)
                }
              />
            </>
          ) : null}

          <Button.Solid
            icon={ICONS.ADD}
            text="Add Symptom"
            onPress={methods.handleOnAdd}
          />
        </VStack>
      }
    />
  );
};

export const SymptomsScreen = ({ navigation }) => {
  return (
    <TrackedSymptomsProvider>
      <Symptoms />
    </TrackedSymptomsProvider>
  );
};
