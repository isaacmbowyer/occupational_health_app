import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { AuthenticationContextProvider } from "./src/contexts/useAuthenticationContext";

export default function App() {
  return (
    <>
      <GluestackUIProvider config={config}>
        <AuthenticationContextProvider>
          <></>
        </AuthenticationContextProvider>
      </GluestackUIProvider>
      <ExpoStatusBar style="auto"></ExpoStatusBar>
    </>
  );
}
