import React, { useState, useEffect } from "react";

import { Entypo } from "@expo/vector-icons";
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { WeatherDataInterface } from "./LocationListScreen";
import { WeatherApiIcon } from "../../components/WeatherApiIcon";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export const SearchingLocationScreen = ({ navigation }: any) => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherDataInterface>();
  const [value, setValue] = useState("");

  const getLocationWeather = () => {
    setValue(location);
  };

  const addToFavorite = () => {
    navigation.navigate("LocationList", {
      weather,
    });

    setWeather(undefined);
    setValue("");
  };

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${value}`;

        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "3bb54b3294mshf5c7331d95313f0p183ec3jsnabe01beb2a16",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(error);
        return error;
      }
    };
    getWeatherData().then(setWeather);
    setLocation("");
  }, [value]);

  return (
    <View style={styles.container}>
      <WeatherApiIcon />

      {!weather?.error ? (
        <>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 10,
            }}
          >
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
              <Text style={{ fontSize: 24 }}>{weather?.location?.name},</Text>
              <Text style={{ fontSize: 24 }}>{weather?.location?.country}</Text>
            </View>
            <Image
              style={{
                borderColor: "red",
                width: 120,
                height: 120,
                marginTop: 10,
              }}
              source={{
                uri: `https:${weather?.current?.condition.icon}`,
              }}
            />
            <Text
              style={{ fontSize: 50 }}
            >{`${weather?.current?.temp_c} C`}</Text>
            <Text>{weather?.current?.condition.text}</Text>
            <Text>{`Wind: ${weather?.current?.wind_kph} k/h`}</Text>
          </View>
          <TouchableOpacity
            onPress={addToFavorite}
            style={styles.sendContainer}
          >
            <Text style={styles.publishBtn}>Add to favorite</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={{ marginHorizontal: 10, marginTop: 20 }}>
            <View style={styles.inputContainer}>
              <Entypo name="location-pin" size={28} color="#228b22" />

              <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={location}
                onChangeText={(value) => setLocation(value)}
                placeholder="Search for a city"
              />
            </View>
            <TouchableOpacity
              onPress={getLocationWeather}
              style={styles.sendContainer}
            >
              <Text style={styles.publishBtn}>Search</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  text: {
    color: "blue",
    fontSize: 22,
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 10,
  },
  input: {
    flex: 1,
  },
  sendContainer: {
    backgroundColor: "#228b22",
    borderRadius: 4,
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  publishBtn: {
    color: "#fff",
  },
});
