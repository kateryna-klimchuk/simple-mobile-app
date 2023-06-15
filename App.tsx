import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useRoute } from "./router";
import "react-native-url-polyfill/auto";
// import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { RegisterScreen } from "./screens/auth/RegisterScreen";
import { HomeScreen } from "./screens/mainScreens/HomeScreen";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AntDesign, Feather } from "@expo/vector-icons";
import { CreateScreen } from "./screens/mainScreens/CreateScreen";
import { PostsScreen } from "./screens/mainScreens/PostsScreen";
import { ProfileScreen } from "./screens/mainScreens/ProfileScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { DefaultScreen } from "./screens/nestedScreens/DefaultScreen";

const customFonts = {
  "Lora-regular": require("./assets/fonts/Lora-Regular.ttf"),
  "Lora-medium": require("./assets/fonts/Lora-Medium.ttf"),
  "Lora-bold": require("./assets/fonts/Lora-Bold.ttf"),
  "Lora-italic": require("./assets/fonts/Lora-Italic.ttf"),
};

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

const loadApplication = async () => {
  await Font.loadAsync(customFonts);
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute(true);

  const [session, setSession] = useState<Session | null>(null);
  // useEffect(() => {
  //   setIsReady(supabase.auth.session());
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     console.log(session);
  //     setIsReady(session);
  //   });
  // });
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log("session in app==>>", session);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  const postButton = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => (
    <AntDesign
      name="picture"
      size={props.size}
      color={props.color}
      focused={props.focused}
    />
  );
  const createButton = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => (
    <AntDesign
      name="plussquareo"
      size={props.size}
      color={props.color}
      focused={props.focused}
    />
  );
  const userButton = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => (
    <Feather
      name="user"
      size={props.size}
      color={props.color}
      focused={props.focused}
    />
  );

  return (
    //   <View style={{ flex: 1 }}>
    //     {session && session.user ? (
    //       <HomeScreen key={session.user.id} session={session} />
    //     ) : (
    //       <RegisterScreen />
    //     )}
    //   </View>
    // );
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {
          session && session["user"] ? (
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
              <Tab.Screen
                name="Posts"
                component={PostsScreen}
                options={{
                  tabBarIcon: (props) => postButton(props),
                }}
              />
              <Tab.Screen
                name="Create"
                component={CreateScreen}
                options={{
                  tabBarIcon: (props) => createButton(props),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  tabBarIcon: (props) => userButton(props),
                }}
              />
            </Tab.Navigator>
          ) : (
            // <HomeScreen key={session.user.id} session={session} />
            <MainStack.Navigator>
              <MainStack.Screen
                name="Registration"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
              <MainStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <MainStack.Screen
                name="Posts"
                component={PostsScreen}
                // key={session?.user.id}
                // session={session}
                // options={{ headerShown: false }}
              />
            </MainStack.Navigator>
          )

          // <RegisterScreen />
        }
      </View>
      {/* {routing} */}
    </NavigationContainer>
  );
}
