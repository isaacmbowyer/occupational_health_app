import { formatTitleWithCount } from "../../../utils/formatTitleWithCount";
import { AppHeaderTags } from "../AppHeaderTags";
import { AppHeaderFetchingState } from "../AppHeaderFetchingState";
import { AppHeaderContent } from "../AppHeaderContent";
import { SearchAction } from "../../modules/SearchAction";

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
          <SearchAction
            isSearchActive={search.isSearchActive}
            handleOnSearch={search.handleOnSearch}
          />
        }
      />
    );
  }

  return (
    <AppHeaderContent
      action={
        <SearchAction
          isSearchActive={search.isSearchActive}
          handleOnSearch={search.handleOnSearch}
        />
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
