import { formatTitleWithCount } from "../../../utils/formatTitleWithCount";
import { AppHeaderTags } from "../AppHeaderTags";
import { IconButton } from "../../atoms/IconButton";
import { ICONS } from "../../../data/icons";
import { AppHeaderFetchingState } from "../AppHeaderFetchingState";
import { HStack } from "@gluestack-ui/themed";
import { AppHeaderContent } from "../AppHeaderContent";

interface IAppHeaderProps {
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

export const AppHeader = ({
  title,
  count,
  isFetching,
  symptomSource,
  search,
  tagList,
}: IAppHeaderProps) => {
  const formattedTitle = formatTitleWithCount(title, count);

  if (isFetching) {
    return (
      <AppHeaderFetchingState
        tags={tagList}
        action={
          <HStack>
            {!search.isSearchActive && (
              <IconButton.Medium
                handleOnPress={search.handleOnSearch}
                icon={ICONS.SEARCH}
              />
            )}
            {search.isSearchActive && (
              <IconButton.Medium
                handleOnPress={search.handleOnSearch}
                icon={ICONS.CLOSE}
              />
            )}
          </HStack>
        }
      />
    );
  }

  return (
    <AppHeaderContent
      action={
        <HStack>
          {!search.isSearchActive && (
            <IconButton.Medium
              handleOnPress={search.handleOnSearch}
              icon={ICONS.SEARCH}
            />
          )}
          {search.isSearchActive && (
            <IconButton.Medium
              handleOnPress={search.handleOnSearch}
              icon={ICONS.CLOSE}
            />
          )}
        </HStack>
      }
      title={formattedTitle}
      tags={
        <AppHeaderTags
          tagList={tagList}
          active={symptomSource.active}
          handleSetActive={symptomSource.handleOnChange}
        />
      }
    />
  );
};
