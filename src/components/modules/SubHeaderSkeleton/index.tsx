import { HStack } from "@gluestack-ui/themed";
import { Skeleton, SkeletonContainer } from "react-native-skeleton-component";

export const SubHeaderSkeleton = () => {
  return (
    <SkeletonContainer>
      <HStack width="$full" justifyContent="space-between" minHeight="$10">
        <Skeleton
          style={{
            height: 21,
            width: 178,
          }}
        />
        <Skeleton
          style={{
            height: 21,
            width: 70,
          }}
        />
      </HStack>
    </SkeletonContainer>
  );
};
