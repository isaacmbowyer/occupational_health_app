import { Image } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";

interface IImageLinkProps {
  image: any;
  onPress: () => void;
}

export const ImageLink = ({ image, onPress }: IImageLinkProps) => {
  return (
    <Pressable onPress={onPress}>
      <Image source={image} height={160} width={140} alt="image-link" />
    </Pressable>
  );
};
