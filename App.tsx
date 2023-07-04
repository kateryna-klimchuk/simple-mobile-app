import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import "react-native-url-polyfill/auto";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CurrentLocationScreen } from "./screens/mainScreens/CurrentLocationScreen";
import { SearchingLocationScreen } from "./screens/mainScreens/SearchingLocationScreen";
import { Button } from "./components/Buttons";
import { LocationListScreen } from "./screens/mainScreens/LocationListScreen";

const customFonts = {
  "Lora-regular": require("./assets/fonts/Lora-Regular.ttf"),
  "Lora-medium": require("./assets/fonts/Lora-Medium.ttf"),
  "Lora-bold": require("./assets/fonts/Lora-Bold.ttf"),
  "Lora-italic": require("./assets/fonts/Lora-Italic.ttf"),
};

const Tab = createBottomTabNavigator();

const loadApplication = async () => {
  await Font.loadAsync(customFonts);
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{ tabBarShowLabel: false, headerShown: false }}
        >
          <Tab.Screen
            name="CurrentLocation"
            component={CurrentLocationScreen}
            options={{
              tabBarIcon: (props) => Button.location(props),
            }}
          />
          <Tab.Screen
            name="LocationList"
            component={LocationListScreen}
            options={{
              tabBarIcon: (props) => Button.list(props),
            }}
          />
          <Tab.Screen
            name="SearchingLocation"
            component={SearchingLocationScreen}
            options={{
              tabBarIcon: (props) => Button.add(props),
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
