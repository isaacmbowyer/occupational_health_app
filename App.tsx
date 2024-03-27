import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, SafeAreaView } from "@gluestack-ui/themed";
import { AuthenticationProvider } from "./src/contexts/useAuthenticationContext";
import { AppNavigation } from "./src/components/modules/AppNavigation";
import { Platform, StatusBar } from "react-native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { colors } from "./src/data/colors";

const isAndorid = Platform.OS === "android";

export default function App() {
  return (
    <>
      <SafeAreaView
        flex={1}
        marginTop={isAndorid ? StatusBar.currentHeight : 0}
      >
        <GluestackUIProvider config={config}>
          <AuthenticationProvider>
            <AppNavigation />
          </AuthenticationProvider>
        </GluestackUIProvider>
      </SafeAreaView>
      <ExpoStatusBar style="auto"></ExpoStatusBar>
    </>
  );
}
