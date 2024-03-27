import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../../screens/ScreenHome";
import { NavigationContainer } from "@react-navigation/native";
import { LogInScreen } from "../../../screens/ScreenLogIn";
import { CreateAccountScreen } from "../../../screens/ScreenCreateAccount";

export const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Create Account"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Log In" component={LogInScreen} />
        <Stack.Screen name="Create Account" component={CreateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
