import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export const MapScreen = ({ route }: any) => {
  console.log("inside map", route.params.value);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.516339,
          longitude: 30.602185,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      />
      <Marker
        coordinate={{
          // latitude: route.params.value.latitude,
          // longitude: route.params.value.longitude,
          latitude: 50.516339,
          longitude: 30.602185,
        }}
        title="travel photo"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
