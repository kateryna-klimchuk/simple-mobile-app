import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useRoute } from "./router";

const customFonts = {
  "Lora-regular": require("./assets/fonts/Lora-Regular.ttf"),
  "Lora-medium": require("./assets/fonts/Lora-Medium.ttf"),
  "Lora-bold": require("./assets/fonts/Lora-Bold.ttf"),
  "Lora-italic": require("./assets/fonts/Lora-Italic.ttf"),
};

const loadApplication = async () => {
  await Font.loadAsync(customFonts);
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute(true);
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
