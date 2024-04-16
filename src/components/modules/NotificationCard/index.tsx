import { HStack, VStack } from "@gluestack-ui/themed";
import { colors } from "../../../data/colors";
import { ICONS } from "../../../data/icons";
import Icon from "react-native-vector-icons/Ionicons";
import { Text } from "../../atoms/Text";
import { Menu } from "../../atoms/Menu";
import { IMenuItem } from "../../../entities/IMenuItem";
import { validateOptionsBasedOnBoolean } from "../../../utils/validateOptionsBasedOnBoolean";
import { Banner } from "../../atoms/Banner";

interface INotificationCardProps {
  title: string;
  subTitle: string;
  isRead: boolean;
}

export const NotificationCard = ({
  title,
  subTitle,
  isRead,
}: INotificationCardProps) => {
  const readColor = validateOptionsBasedOnBoolean(
    isRead,
    colors.sky_blue,
    colors.gray
  );

  return (
    <VStack width="$full">
      <HStack
        borderColor={readColor}
        borderWidth="$1"
        borderRadius="$md"
        backgroundColor={colors.white}
        padding="$2"
        width="$full"
        hardShadow="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack space="sm" alignItems="center">
          <Icon name="notifications-outline" size={70} color={readColor} />

          <VStack space="xs" width={160}>
            <Text.Regular bold>{title}</Text.Regular>
            <Text.Small color="gray">{subTitle}</Text.Small>
          </VStack>
        </HStack>

        <Menu
          title="Notification Menu"
          items={[
            { title: isRead ? "Unread" : "Read" },
            { title: "Delete", icon: ICONS.DELETE },
          ]}
        />
      </HStack>
      {isRead ? <Banner /> : null}
    </VStack>
  );
};
