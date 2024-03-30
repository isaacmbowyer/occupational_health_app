import { HStack, Icon, VStack } from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { Skeleton, SkeletonContainer } from "react-native-skeleton-component";

interface IAppHeaderFetchingStateProps {
  tags: string[];
  action: ReactNode;
}
export const AppHeaderFetchingState = ({
  tags,
  action,
}: IAppHeaderFetchingStateProps) => {
  return (
    <SkeletonContainer>
      <VStack
        width="$full"
        alignItems="flex-start"
        marginBottom="$4"
        space="lg"
      >
        <HStack width="$full" justifyContent="space-between">
          <Skeleton
            style={{
              height: 36,
              width: 214,
            }}
          />
          {action}
        </HStack>
        <HStack width="$full" space="md">
          {tags.map((tag) => (
            <Skeleton
              key={tag}
              style={{
                height: 24,
                width: 103,
              }}
            />
          ))}
        </HStack>
      </VStack>
    </SkeletonContainer>
  );
};
