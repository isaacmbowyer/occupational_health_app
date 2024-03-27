import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../../screens/ScreenHome";
import { NavigationContainer } from "@react-navigation/native";
import { LogInScreen } from "../../../screens/ScreenLogIn";

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
        <Stack.Screen name="Log In" component={LogInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
