import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../../../data/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SymptomsScreen } from "../../../screens/ScreenAppSymptoms";
import { SettingsScreen } from "../../../screens/ScreenAppSettings";

const TAB_ICON = {
  Symptoms: "self_improvement",
  Settings: "settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Icon name={iconName} size={size} color={color} />
    ),
    activeTintColor: colors.sky_blue,
    inactiveTintColor: colors.muted,
  };
};

export const PrivateNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="Symptoms" component={SymptomsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
