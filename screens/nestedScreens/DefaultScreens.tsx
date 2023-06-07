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

export const DefaultScreen = ({ route, navigation }: any) => {
  const [posts, setPosts] = useState([]);

  console.log(route.params);

  useEffect(() => {
    if (route.params !== undefined) {
      setPosts((prevState): any => [...prevState, route.params]);
    }
  }, [route.params]);

  const getLocation = (value: any) => {
    navigation.navigate("Map", { value });
  };

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={posts}
        keyExtractor={(post, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item["photo"] }}
              style={{
                height: 400,
                width: 400,
                borderRadius: 4,
                resizeMode: "contain",
              }}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#d3d3d3",
                width: 350,
                marginTop: 20,
                paddingBottom: 8,
              }}
            >
              <Text>{item["description"]}</Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                marginLeft: 20,
                marginTop: 20,
              }}
              onPress={() => getLocation(item["location"])}
            >
              <Entypo name="location" size={20} color="#ff8c00" />
              <Text style={{ marginLeft: 10, color: "#ff8c00" }}>
                Click to see on map
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
