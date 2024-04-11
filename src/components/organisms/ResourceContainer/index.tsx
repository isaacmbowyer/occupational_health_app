import { VStack } from "@gluestack-ui/themed";
import { IResource } from "../../../entities/IResource";
import { ResourceCard } from "../../modules/ResourceCard";
import { IOption } from "../../../entities/IOption";
import { findOption } from "../../../utils/findOption";

interface IResourceContainer {
  items: IResource[];
  types: IOption[];
  numberOfUsers: number;
  handleOnView: (link: string) => void;
  handleOnLike: (item: IResource) => void;
}

export const ResourceContainer = ({
  items,
  types,
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
          imageUri={item?.companyLogo}
          resourceType={findOption(types, "id", item?.typeId)?.name}
          resourceInformation={item?.information}
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
