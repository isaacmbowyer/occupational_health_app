import { HStack } from "@gluestack-ui/themed";
import { Tag } from "../../atoms/Tag";

interface IAppHeaderTagsProps {
  active: string;
  handleSetActive: (active: string) => void;
  tagList: string[];
}

export const AppHeaderTags = ({
  active,
  handleSetActive,
  tagList,
}: IAppHeaderTagsProps) => {
  return (
    <HStack space="md">
      {tagList.map((tag) => (
        <Tag
          key={tag}
          name={tag}
          handleOnPress={handleSetActive}
          isActive={active === tag}
        />
      ))}
    </HStack>
  );
};
