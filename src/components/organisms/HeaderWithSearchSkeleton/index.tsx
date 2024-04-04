import { HStack, VStack } from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { Skeleton, SkeletonContainer } from "react-native-skeleton-component";

interface IHeaderWithSearchSkeletonProps {
  tags: string[];
  action: ReactNode;
}
export const HeaderWithSearchSkeleton = ({
  tags,
  action,
}: IHeaderWithSearchSkeletonProps) => {
  return (
    <SkeletonContainer>
      <VStack
        width="$full"
        alignItems="flex-start"
        marginBottom="$2"
        space="sm"
      >
        <HStack width="$full" justifyContent="space-between">
          <Skeleton
            style={{
              height: 30,
              width: 220,
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
