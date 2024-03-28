import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../../../config/firebase";
import { PrivateNavigation } from "../../organisms/PrivateNavigation";
import { PublicNavigation } from "../../organisms/PublicNavigation";

export const AppNavigation = () => {
  const isAuthenticated = !!auth?.currentUser?.uid;

  return (
    <NavigationContainer>
      {isAuthenticated ? <PrivateNavigation /> : <PublicNavigation />}
    </NavigationContainer>
  );
};
