import React from "react";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { RegisterScreen } from "./screens/auth/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import * as Font from "expo-font";

const MainStack = createNativeStackNavigator();

const loadApplication = async () => {
  await Font.loadAsync({});
};

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Registration"
          component={RegisterScreen}
          options={{ title: "" }}
        />
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Home" component={HomeScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
