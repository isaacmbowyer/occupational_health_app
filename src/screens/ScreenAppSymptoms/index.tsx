import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { Header } from "../../components/organisms/Header";
import { SubHeader } from "../../components/organisms/SubHeader";

export const SymptomsScreen = () => {
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
        </VStack>
      }
    />
  );
};
