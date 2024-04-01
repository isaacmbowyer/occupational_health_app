import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { Header } from "../../components/organisms/Header";
import { SubHeader } from "../../components/organisms/SubHeader";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { TrackedSymptomsProvider, useTrackedSymptomsContext } from "./context";

const Symptoms = () => {
  const { state, methods } = useTrackedSymptomsContext();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack>
          <Header
            title="Long-Covid Symptoms"
            count={4}
            search={{
              isSearchActive: false,
              handleOnSearch: () => console.log("search"),
            }}
            symptomSource={{
              active: "current",
              handleOnChange: (val) => console.log("new source"),
            }}
            isFetching={false}
            tagList={["current", "completed"]}
          />
          <SubHeader
            pageCount={1}
            currentPage={1}
            entriesCount={4}
            currentEntries={4}
            isFetching={false}
            label="symptoms"
          />
          <Pagination
            totalItems={state?.count}
            pageSize={state?.limit}
            currentPage={state?.currentPage}
            onPageChange={methods?.handleSetCurrentPage}
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
