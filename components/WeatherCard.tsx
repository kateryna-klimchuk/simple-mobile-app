import React from "react";
import { Text, View, Image, ImageBackground, StyleSheet } from "react-native";
export interface WeatherCardInterface {
  // id: any;
  icon: string | undefined;
  city: string | undefined;
  wind: string | undefined;
  temperature: string | undefined;
  condition: string | undefined;
}

export const WeatherCard = ({
  icon,
  city,
  wind,
  temperature,
  condition,
}: WeatherCardInterface) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <ImageBackground
        source={require("../assets/wetherSky.jpg")}
        style={{
          borderRadius: 10,
          marginHorizontal: 10,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            columnGap: 4,
            width: "100%",
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
              width: 100,
              height: 100,
              marginTop: 10,
            }}
            source={{
              uri: `https:${icon}`,
            }}
          />
          <View>
            <Text style={{ fontSize: 24 }}>{`${temperature} C`}</Text>
            <Text>{condition}</Text>
            <Text>{`Wind: ${wind} k/h`}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
