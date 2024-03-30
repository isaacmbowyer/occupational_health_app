import { formatTitleWithCount } from "../../../utils/formatTitleWithCount";
import { HeaderSkeleton } from "../HeaderSkeleton";
import { SearchAction } from "../../modules/SearchAction";
import { VStack, HStack } from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";
import { HeaderTags } from "../HeaderTags";

interface IHeaderProps {
  title: string;
  count: number;
  isFetching: boolean;
  symptomSource: {
    active: string;
    handleOnChange: (source: string) => void;
  };
  search: {
    isSearchActive: boolean;
    handleOnSearch: () => void;
  };
  tagList: string[];
}

export const Header = ({
  title,
  count,
  isFetching,
  symptomSource,
  search,
  tagList,
}: IHeaderProps) => {
  const formattedTitle = formatTitleWithCount(title, count);

  if (isFetching) {
    return (
      <HeaderSkeleton
        tags={tagList}
        action={
          <SearchAction
            isSearchActive={search.isSearchActive}
            handleOnSearch={search.handleOnSearch}
          />
        }
      />
    );
  }

  return (
    <VStack width="$full" marginBottom="$2" space="sm">
      <HStack width="$full" justifyContent="space-between" alignItems="center">
        <Text.SubHeader bold color="sky_blue">
          {formattedTitle}
        </Text.SubHeader>
        <SearchAction
          isSearchActive={search.isSearchActive}
          handleOnSearch={search.handleOnSearch}
        />
      </HStack>
      <HeaderTags
        tagList={tagList}
        active={symptomSource.active}
        handleSetActive={symptomSource.handleOnChange}
      />
    </VStack>
  );
};
