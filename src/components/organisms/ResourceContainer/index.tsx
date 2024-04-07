import { VStack } from "@gluestack-ui/themed";
import { IResource } from "../../../entities/IResource";
import { ResourceCard } from "../../modules/ResourceCard";

interface IResourceContainer {
  items: IResource[];
  numberOfUsers: number;
  handleOnView: (link: string) => void;
  handleOnLike: (item: IResource) => void;
}

export const SymptomContainer = ({
  items,
  numberOfUsers,
  handleOnView,
  handleOnLike,
}: IResourceContainer) => {
  return (
    <VStack space="md" width="$full">
      {items?.map((item) => (
        <ResourceCard
          key={item?.id}
          companyName={item?.companyName}
          companyDescription={item?.companyDetails}
          imageUri={item?.logoUri}
          resourceType={item?.type}
          resourceInformation={item?.details}
          numberOfUsers={numberOfUsers}
          numberOfLikes={item?.numberOfLikes}
          isLiked={item?.isLiked}
          handleOnLike={() => handleOnLike(item)}
          handleOnView={() => handleOnView(item?.link)}
        />
      ))}
    </VStack>
  );
};
