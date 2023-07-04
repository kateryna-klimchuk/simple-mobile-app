import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
interface WeatherCardInterface {
  icon: string;
  city: string;
  wind: string;
  temperature: string;
  condition: string;
}

export const WeatherCard = ({
  icon,
  city,
  wind,
  temperature,
  condition,
}: WeatherCardInterface) => {
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: "row",
          columnGap: 4,
          width: 300,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 24 }}>{city}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          columnGap: 14,
        }}
      >
        <Image
          style={{
            width: 120,
            height: 120,
            marginTop: 10,
          }}
          source={{
            uri: `https:${icon}`,
          }}
        />
        <View>
          <Text style={{ fontSize: 50 }}>{`${temperature} C`}</Text>
          <Text>{condition}</Text>
          <Text>{`Wind: ${wind} k/h`}</Text>
        </View>
      </View>
    </View>
  );
};
