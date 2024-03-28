import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../../../data/colors";
import { SymptomsScreen } from "../../../screens/ScreenAppSymptoms";
import { SettingsScreen } from "../../../screens/ScreenAppSettings";
import Icon from "react-native-vector-icons/Ionicons";

export const PrivateNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Symptoms"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Symptoms") {
            iconName = "accessibility-outline";
          } else if (route.name === "Settings") {
            iconName = "settings";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.dark_blue,
        tabBarInactiveTintColor: colors.gray,
        headerTitleAlign: "center",
        tabBarStyle: {
          height: 60,
          paddingBottom: 4,
        },
      })}
    >
      <Tab.Screen name="Symptoms" component={SymptomsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
