import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../../../components/atoms/Text";
import { IResource } from "../../../../entities/IResource";
import { ResourceContainer } from "../../../../components/organisms/ResourceContainer";
import { ISymptomGoalStateKey } from "../../../../entities/ISymptomGoalStateKey";
import { ISymptomGoalStateKeyValue } from "../../../../entities/ISymptomGoalStateKeyValue";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { SubHeaderWithTags } from "../../../../components/modules/SubHeaderWithTags";
import { ResourceSkeleton } from "../../../../components/modules/ResourceSkeleton";

interface ISymptomResourcesSectionProps {
  totalPages: number;
  currentPage: number;
  count: number;
  limit: number;
  numberOfUsers: number;
  resources: IResource[];
  isFetching: boolean;
  tagList: string[];
  source: string;
  handleOnView: (link: string) => void;
  handleOnLike: (item: IResource) => void;
  handleOnChange: (
    key: ISymptomGoalStateKey,
    value: ISymptomGoalStateKeyValue
  ) => void;
}

export const SymptomResourcesSection = ({
  totalPages,
  currentPage,
  count,
  limit,
  numberOfUsers,
  resources,
  isFetching,
  tagList,
  source,
  handleOnView,
  handleOnLike,
  handleOnChange,
}: ISymptomResourcesSectionProps) => {
  if (!resources.length && !isFetching)
    return (
      <>
        <SubHeaderWithTags
          pageCount={totalPages}
          currentPage={currentPage}
          entriesCount={count}
          currentEntries={resources.length}
          isFetching={isFetching}
          label="resources"
          tagList={tagList}
          activeSource={source}
          handleOnChange={(val) => handleOnChange("source", val)}
        />

        <Text.Regular color="gray">
          There are no resources currently available for this symptom
        </Text.Regular>
      </>
    );

  return (
    <VStack>
      <SubHeaderWithTags
        pageCount={totalPages}
        currentPage={currentPage}
        entriesCount={count}
        currentEntries={resources.length}
        isFetching={isFetching}
        label="resources"
        tagList={tagList}
        activeSource={source}
        handleOnChange={(val) => handleOnChange("source", val)}
      />

      {isFetching ? (
        <VStack space="md">
          <ResourceSkeleton />
          <ResourceSkeleton />
        </VStack>
      ) : (
        <>
          <ResourceContainer
            numberOfUsers={numberOfUsers}
            items={resources}
            handleOnView={handleOnView}
            handleOnLike={handleOnLike}
          />

          <Pagination
            totalItems={count}
            pageSize={limit}
            currentPage={currentPage}
            onPageChange={(newPage) => handleOnChange("currentPage", newPage)}
          />
        </>
      )}
    </VStack>
  );
};
