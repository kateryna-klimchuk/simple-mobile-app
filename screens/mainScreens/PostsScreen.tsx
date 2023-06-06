import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Text, FlatList, View, StyleSheet, Image } from "react-native";

export const PostsScreen: React.FunctionComponent = ({ route }: any) => {
  console.log(route.params);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params !== undefined) {
      setPosts((prevState) => [...prevState, route?.params]);
    }
  }, [route.params]);
  console.log("posts", posts);

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={posts}
        keyExtractor={(post, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ height: 320, width: 320 }}
            />
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
