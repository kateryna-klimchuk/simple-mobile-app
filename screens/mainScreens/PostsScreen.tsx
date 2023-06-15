// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";

// import {
//   Text,
//   FlatList,
//   View,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
// import { supabase } from "../../lib/supabase";
// import { Session } from "@supabase/supabase-js";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { MapScreen } from "../nestedScreens/MapScreen";
// import { DefaultScreen } from "../nestedScreens/DefaultScreen";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { CreateScreen } from "./CreateScreen";
// import { ProfileScreen } from "./ProfileScreen";
// const NestedScreen = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// export const PostsScreen = () => {
//   const postButton = (props: {
//     focused: boolean;
//     color: string;
//     size: number;
//   }) => (
//     <AntDesign
//       name="picture"
//       size={props.size}
//       color={props.color}
//       focused={props.focused}
//     />
//   );
//   const createButton = (props: {
//     focused: boolean;
//     color: string;
//     size: number;
//   }) => (
//     <AntDesign
//       name="plussquareo"
//       size={props.size}
//       color={props.color}
//       focused={props.focused}
//     />
//   );
//   const userButton = (props: {
//     focused: boolean;
//     color: string;
//     size: number;
//   }) => (
//     <Feather
//       name="user"
//       size={props.size}
//       color={props.color}
//       focused={props.focused}
//     />
//   );
//   return (
//     <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
//       <Tab.Screen
//         name="Posts"
//         component={PostsScreen}
//         options={{
//           tabBarIcon: (props) => postButton(props),
//         }}
//       />
//       <Tab.Screen
//         name="Create"
//         component={CreateScreen}
//         options={{
//           tabBarIcon: (props) => createButton(props),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: (props) => userButton(props),
//         }}
//       />
//     </Tab.Navigator>
//     // <NestedScreen.Navigator>
//     //   <NestedScreen.Screen
//     //     name="DefaultScreen"
//     //     component={DefaultScreen}
//     //     options={{ headerShown: false }}
//     //   />
//     //   <NestedScreen.Screen name="Map" component={MapScreen} />
//     // </NestedScreen.Navigator>
//   );
// };

import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";

export const PostsScreen = (session: Session) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      console.log(data);

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Website"
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
