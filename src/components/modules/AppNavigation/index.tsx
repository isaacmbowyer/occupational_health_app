import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../../screens/ScreenHome";
import { NavigationContainer } from "@react-navigation/native";

export const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
