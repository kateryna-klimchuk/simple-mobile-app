import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "../nestedScreens/MapScreen";
import { DefaultScreen } from "../nestedScreens/DefaultScreens";
const NestedScreen = createNativeStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
