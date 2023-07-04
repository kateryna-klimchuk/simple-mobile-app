import React, { useEffect, useState } from "react";

import { Text, View, Image, StyleSheet } from "react-native";
import { getWeatherData } from "../../components/utilities/getWeatherData";

import { WeatherCard } from "../../components/WeatherCard";

export const LocationListScreen = () => {
  const [weather, setWeather] = useState();
  const [paris, setParis] = useState();
  const [london, setLondon] = useState();

  const newYorkWeather = `https://weatherapi-com.p.rapidapi.com/current.json?q=new-york`;
  const parisWeather = `https://weatherapi-com.p.rapidapi.com/current.json?q=paris`;
  const londonWeather = `https://weatherapi-com.p.rapidapi.com/current.json?q=london`;

  useEffect(() => {
    getWeatherData(newYorkWeather).then(setWeather);
    getWeatherData(parisWeather).then(setParis);
    getWeatherData(londonWeather).then(setLondon);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 110,
          height: 50,
          marginTop: 70,
          alignSelf: "flex-start",
        }}
        source={{
          uri: "https://cdn.weatherapi.com/v4/images/weatherapi_logo.png",
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <WeatherCard
          icon={weather?.current?.condition.icon}
          city={weather?.location?.name}
          wind={weather?.current?.wind_kph}
          temperature={weather?.current?.temp_c}
          condition={weather?.current?.condition.text}
        />
        <WeatherCard
          icon={paris?.current?.condition.icon}
          city={paris?.location?.name}
          wind={paris?.current?.wind_kph}
          temperature={paris?.current?.temp_c}
          condition={paris?.current?.condition.text}
        />
        <WeatherCard
          icon={london?.current?.condition.icon}
          city={london?.location?.name}
          wind={london?.current?.wind_kph}
          temperature={london?.current?.temp_c}
          condition={london?.current?.condition.text}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});
