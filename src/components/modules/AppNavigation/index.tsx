import { NavigationContainer } from "@react-navigation/native";
import { PrivateNavigation } from "../../organisms/PrivateNavigation";
import { PublicNavigation } from "../../organisms/PublicNavigation";
import { useAuthenticationContext } from "../../../contexts/useAuthenticationContext";

export const AppNavigation = () => {
  const { state } = useAuthenticationContext();

  return (
    <NavigationContainer>
      {/* {state?.isAuthenticated ? <PrivateNavigation /> : <PublicNavigation />} */}
      <PrivateNavigation />
    </NavigationContainer>
  );
};
