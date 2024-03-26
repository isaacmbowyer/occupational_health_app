import { SafeAreaView, VStack, HStack } from "@gluestack-ui/themed";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../../data/colors";
import { Text } from "../../atoms/Text";
import { ReactNode } from "react";
import { ImageLink } from "../../atoms/ImageLink";

interface IPublicTemplateContainerProps {
  mainSection: ReactNode;
}

export const PublicTemplateContainer = ({
  mainSection,
}: IPublicTemplateContainerProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView flex={1} backgroundColor={colors.white}>
      <VStack flex={1} alignItems="center" padding={"$8"} space="xl">
        <VStack alignItems="center" space="md">
          <ImageLink
            image={require("../../../../assets/logo.png")}
            onPress={() => navigation.navigate("Home")}
          />
          <HStack space="xs">
            <Text.Title>Open - OH</Text.Title>
            <Text.ExtraSmall bold>TM</Text.ExtraSmall>
          </HStack>
        </VStack>
        {mainSection}
        <HStack width="$full" space="3xl">
          <Text.ExtraSmall color="gray">Terms and Conditons</Text.ExtraSmall>
          <Text.ExtraSmall color="gray">Data Protection</Text.ExtraSmall>
          <Text.ExtraSmall color="gray">Cookie Policy</Text.ExtraSmall>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};
