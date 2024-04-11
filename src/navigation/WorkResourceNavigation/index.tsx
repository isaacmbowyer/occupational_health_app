import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WorkResourcesScreen } from "../../screens/ScreenAppWorkResources";
import { WorkResourceScreen } from "../../screens/ScreenAppWorkResource";

export const WorkResourceNavigation = () => {
  const WorkResourceStack = createNativeStackNavigator();

  return (
    <WorkResourceStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <WorkResourceStack.Screen
        name="Work Resources"
        component={WorkResourcesScreen}
      />
      <WorkResourceStack.Screen
        name="Work Resouce"
        component={WorkResourceScreen}
      />
    </WorkResourceStack.Navigator>
  );
};
