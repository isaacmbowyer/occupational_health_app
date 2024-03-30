import { AppHeaderTags } from "../AppHeaderTags";
import { Text } from "../../atoms/Text";
import { VStack, HStack } from "@gluestack-ui/themed";
import { ReactNode } from "react";

interface IAppHeaderContentProps {
  action: ReactNode;
  tags: ReactNode;
  title: string;
}

export const AppHeaderContent = ({ action, title, tags }) => {
  return (
    <VStack width="$full" marginBottom="$4" space="lg">
      <HStack width="$full" justifyContent="space-between">
        <Text.Header color="sky_blue">{title}</Text.Header>
        {action}
      </HStack>
      {tags}
    </VStack>
  );
};
