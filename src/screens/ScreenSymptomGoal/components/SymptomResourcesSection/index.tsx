import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../../../components/atoms/Text";
import { Input } from "../../../../components/atoms/Input";
import { Select } from "../../../../components/atoms/Select";
import { IOption } from "../../../../entities/IOption";
import { ICreateAccountStateKeyValue } from "../../../../entities/ICreateAccountStateKeyValue";
import { ICreateAccountStateKey } from "../../../../entities/ICreateAccountStateKey";
import { IResource } from "../../../../entities/IResource";
import { SubHeader } from "../../../../components/modules/SubHeader";
import { ResourceContainer } from "../../../../components/organisms/ResourceContainer";
import { ISymptomGoalStateKey } from "../../../../entities/ISymptomGoalStateKey";
import { ISymptomGoalStateKeyValue } from "../../../../entities/ISymptomGoalStateKeyValue";
import Pagination from "@cherry-soft/react-native-basic-pagination";

interface ISymptomResourcesSectionProps {
  totalPages: number;
  currentPage: number;
  count: number;
  limit: number;
  numberOfUsers: number;
  resources: IResource[];
  isFetching: boolean;
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
  handleOnView,
  handleOnLike,
  handleOnChange,
}: ISymptomResourcesSectionProps) => {
  return (
    <VStack>
      <SubHeader
        pageCount={totalPages}
        currentPage={currentPage}
        entriesCount={count}
        currentEntries={resources.length}
        isFetching={isFetching}
        label="resources"
      />

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
    </VStack>
  );
};
