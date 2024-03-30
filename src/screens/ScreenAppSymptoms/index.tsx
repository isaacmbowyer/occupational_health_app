import { VStack, View } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { Text } from "../../components/atoms/Text";
import { Skeleton, SkeletonContainer } from "react-native-skeleton-component";
import { AppHeader } from "../../components/organisms/AppHeader";

export const SymptomsScreen = () => {
  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack>
          <AppHeader
            title="Long Covid Symptoms"
            count={40}
            search={{
              isSearchActive: false,
              handleOnSearch: () => console.log("search"),
            }}
            symptomSource={{
              active: "current",
              handleOnChange: (string) => console.log("new source"),
            }}
            isFetching={false}
          />
        </VStack>
      }
    />
  );
};
