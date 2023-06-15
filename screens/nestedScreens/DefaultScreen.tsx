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
  Alert,
} from "react-native";

import { Button, Input } from "react-native-elements";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { supabase } from "../../supabase";
import { Session } from "@supabase/supabase-js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreateScreen } from "../mainScreens/CreateScreen";
import { PostsScreen } from "../mainScreens/PostsScreen";
import { ProfileScreen } from "../mainScreens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
export const DefaultScreen = () =>
  // { session }: { session: Session }
  // { route, navigation }: any
  {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [website, setWebsite] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

    // const getUser = async () => {
    //   try {
    //     setLoading(true);
    //     if (!session?.user) throw new Error("No user on the session!");

    //     let { data, error, status } = await supabase
    //       .from("profiles")
    //       .select(`username, website, avatar_url`)
    //       .eq("id", session?.user.id)
    //       .single();
    //     if (error && status !== 406) {
    //       throw error;
    //     }

    //     if (data) {
    //       setUsername(data.username);
    //       setWebsite(data.website);
    //       setAvatarUrl(data.avatar_url);
    //     }
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       Alert.alert(error.message);
    //     }
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // useEffect(() => {
    //   if (session) getUser();
    // }, [session]);
    // console.log("session", session);

    // useEffect(() => {
    //   if (route.params !== undefined) {
    //     setPosts((prevState): any => [...prevState, route.params]);
    //   }
    // }, [route.params]);

    // const getLocation = (value: any) => {
    //   navigation.navigate("Map", { value });
    // };

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
      // <View style={styles.postsContainer}>
      //   <Text>Hello</Text>
      //   <FlatList
      //     data={posts}
      //     keyExtractor={(post, index) => index.toString()}
      //     renderItem={({ item }) => (
      //       <View
      //         style={{
      //           marginBottom: 15,
      //           justifyContent: "center",
      //           alignItems: "center",
      //         }}
      //       >
      //         <Image
      //           source={{ uri: item["photo"] }}
      //           style={{
      //             height: 400,
      //             width: 400,
      //             borderRadius: 4,
      //             resizeMode: "contain",
      //           }}
      //         />
      //         <View
      //           style={{
      //             borderBottomWidth: 1,
      //             borderBottomColor: "#d3d3d3",
      //             width: 350,
      //             marginTop: 20,
      //             paddingBottom: 8,
      //           }}
      //         >
      //           <Text>{item["description"]}</Text>
      //         </View>
      //         <TouchableOpacity
      //           style={{
      //             flexDirection: "row",
      //             alignSelf: "flex-start",
      //             marginLeft: 20,
      //             marginTop: 20,
      //           }}
      //           // onPress={() => getLocation(item["location"])}
      //         >
      //           <Entypo name="location" size={20} color="#ff8c00" />
      //           <Text style={{ marginLeft: 10, color: "#ff8c00" }}>
      //             Click to see on map
      //           </Text>
      //         </TouchableOpacity>
      //       </View>
      //     )}
      //   />
      // </View>
    );
  };

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
//       <View style={styles.container}>
//         <View style={[styles.verticallySpaced, styles.mt20]}>
//           <Input label="Email" value={session?.user?.email} disabled />
//         </View>
//         <View style={styles.verticallySpaced}>
//           <Input
//             label="Username"
//             value={username || ""}
//             onChangeText={(text) => setUsername(text)}
//           />
//         </View>
//         <View style={styles.verticallySpaced}>
//           <Input
//             label="Website"
//             value={website || ""}
//             onChangeText={(text) => setWebsite(text)}
//           />
//         </View>

//         <View style={[styles.verticallySpaced, styles.mt20]}>
//           <Button
//             title={loading ? "Loading ..." : "Update"}
//             // onPress={() =>
//             //   updateProfile({ username, website, avatar_url: avatarUrl })
//             // }
//             disabled={loading}
//           />
//         </View>

//         <View style={styles.verticallySpaced}>
//           <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
//         </View>
//       </View>
//     );
//   };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     padding: 12,
//   },
//   verticallySpaced: {
//     paddingTop: 4,
//     paddingBottom: 4,
//     alignSelf: "stretch",
//   },
//   mt20: {
//     marginTop: 20,
//   },
// });
