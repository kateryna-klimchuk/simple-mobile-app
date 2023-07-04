import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import { z } from "zod";
import { WeatherDataInterface } from "./LocationListScreen";

const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
export const CurrentLocationScreen = () => {
  const [weather, setWeather] = useState<WeatherDataInterface>();
  const [location, setLocation] = useState<typeof locationSchema>();
  const [errorMsg, setErrorMsg] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }
  //   })();
  // }, []);

  // const getLocation = async () => {
  // //   const userLocation = await Location.getCurrentPositionAsync();
  // //   console.log("current location", userLocation.coords);
  // // };

  // // const locat = getLocation();

  // // console.log("locat", locat);

  const searchParams = "eindhoven";
  // const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${searchParams}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3bb54b3294mshf5c7331d95313f0p183ec3jsnabe01beb2a16",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        // const userLocation = await Location.getCurrentPositionAsync({});
        // console.log("userLocation", userLocation);

        // const { latitude, longitude } = userLocation.coords;
        // const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude}, ${longitude}`;
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${searchParams}`;

        const response = await fetch(url, options);
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(error);
        return error;
      }
    };
    getWeatherData().then(setWeather);
  }, []);

  return (
    <View style={styles.container}>
      {weather ? (
        <>
          <Image
            style={{ width: 220, height: 100, marginTop: 100 }}
            source={{
              uri: "https://cdn.weatherapi.com/v4/images/weatherapi_logo.png",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              columnGap: 4,
              marginTop: 60,
              width: 300,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 24 }}>{weather.location.name},</Text>
            <Text style={{ fontSize: 24 }}>{weather.location.country}</Text>
          </View>
          <Image
            style={{
              borderColor: "red",
              width: 120,
              height: 120,
              marginTop: 10,
            }}
            source={{
              uri: `https:${weather?.["current"]?.["condition"].icon}`,
            }}
          />
          <Text style={{ fontSize: 50 }}>{`${weather.current?.temp_c} C`}</Text>
          <Text>{weather.current?.condition.text}</Text>
          <Text>{`Wind: ${weather.current.wind_kph} k/h`}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 170,
              justifyContent: "center",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text style={{}}>Change location? Press</Text>
            <AntDesign name="plussquareo" size={24} color="gray" />
          </View>
        </>
      ) : (
        <Text>Nothing to show</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
});
