import React, { useState, useEffect } from "react";

// import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export const ProfileScreen = () => {
  const [location, setLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState("");
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }
  //   })();
  // }, []);

  const getLocationWeather = () => {
    setValue(location);
    console.log(value);
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
      {!weather.error ? (
        <>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 10,
            }}
          >
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
            >{`${weather.current?.temp_c} C`}</Text>
            <Text>{weather.current?.condition.text}</Text>
            <Text>{`Wind: ${weather?.current?.wind_kph} k/h`}</Text>
          </View>
          <>
            <Text
              style={{
                paddingBottom: 4,
                marginLeft: 10,
                alignSelf: "flex-start",
              }}
            >
              Choose another place:
            </Text>
            <View
              style={{
                flexDirection: "row",
                columnGap: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo
                name="location-pin"
                size={28}
                color="#228b22"
                style={{ marginTop: 16 }}
              />
              <TextInput
                style={styles.input}
                value={location}
                autoCapitalize="none"
                onChangeText={(value) => setLocation(value)}
              />
            </View>
            <TouchableOpacity
              onPress={getLocationWeather}
              style={{ ...styles.sendContainer, marginBottom: 10 }}
            >
              <Text style={styles.publishBtn}>Search</Text>
            </TouchableOpacity>
          </>
        </>
      ) : (
        <>
          <Image
            style={{
              width: 220,
              height: 100,
              alignSelf: "center",
              marginTop: 100,
            }}
            source={{
              uri: "https://cdn.weatherapi.com/v4/images/weatherapi_logo.png",
            }}
          />
          <Text style={{ paddingBottom: 4, marginTop: 30, marginLeft: 10 }}>
            Choose a place:
          </Text>
          <View
            style={{
              flexDirection: "row",
              columnGap: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Entypo
              name="location-pin"
              size={28}
              color="#228b22"
              style={{ marginTop: 16 }}
            />

            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={location}
              onChangeText={(value) => setLocation(value)}
            />
          </View>
          <TouchableOpacity
            onPress={getLocationWeather}
            style={styles.sendContainer}
          >
            <Text style={styles.publishBtn}>Search</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    color: "blue",
    fontSize: 22,
  },
  input: {
    height: 40,
    width: "92%",
    borderColor: "#dcdcdc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#f8f8ff",
    marginTop: 20,
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
