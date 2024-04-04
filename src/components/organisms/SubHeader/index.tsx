import { HStack } from "@gluestack-ui/themed";
import { Text } from "../../atoms/Text";
import { SubHeaderSkeleton } from "../../modules/SubHeaderSkeleton";

interface ISubHeaderProps {
  pageCount?: number;
  currentPage?: number;
  entriesCount?: number;
  currentEntries?: number;
  isFetching: boolean;
  label: string;
}

export const SubHeader = ({
  pageCount = 1,
  currentPage = 1,
  entriesCount = 0,
  currentEntries = entriesCount,
  isFetching,
  label,
}: ISubHeaderProps) => {
  if (isFetching) {
    return <SubHeaderSkeleton />;
  }

  const formattedEntitesCount = currentEntries ? entriesCount : 0;
  const formattedPageCount = pageCount || 1;

  return (
    <HStack width="$full" justifyContent="space-between" height="$10">
      <Text.Small color="sky_blue">
        Displaying {currentEntries} of {formattedEntitesCount} {label}
      </Text.Small>
      <Text.Small color="sky_blue">
        Page {currentPage} of {formattedPageCount}
      </Text.Small>
    </HStack>
  );
};
