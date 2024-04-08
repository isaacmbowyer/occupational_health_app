import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SymptomsScreen } from "../../screens/ScreenAppSymptoms";
import { SymptomGoalScreen } from "../../screens/ScreenSymptomGoal";
import { SymptomsProvider } from "../../contexts/useSymptomsContext";

export const SymptomNavigation = () => {
  const SymptomStack = createNativeStackNavigator();

  return (
    <SymptomsProvider>
      <SymptomStack.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
      >
        <SymptomStack.Screen name="User Symptoms" component={SymptomsScreen} />
        <SymptomStack.Screen
          name="Symptom Goal"
          component={SymptomGoalScreen}
        />
      </SymptomStack.Navigator>
    </SymptomsProvider>
  );
};
