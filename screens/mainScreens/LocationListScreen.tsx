import React, { useEffect, useState } from "react";

import { View, FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import { getWeatherData } from "../../components/utilities/getWeatherData";
import { WeatherApiIcon } from "../../components/WeatherApiIcon";
import {
  WeatherCard,
  WeatherCardInterface,
} from "../../components/WeatherCard";
import { supabase } from "../../database/supabase";
import { SearchWeatherInput } from "./SearchWeatherInput";

export interface WeatherDataInterface {
  current: {
    condition: { icon: string; text: string };
    wind_kph: string;
    temp_c: string;
  };
  location: { name: string; country: string };
  error: string | undefined;
}

export const LocationListScreen = ({ navigation }: any) => {
  const [weatherData, setWeatherData] = useState<WeatherCardInterface[]>([]);

  useEffect(() => {
    const getDatabaseData = async () => {
      const { data, error } = await supabase.from("weather").select();

      if (data) {
        const weath = data?.map(({ city }) => {
          const dataS = getWeatherData(
            `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`
          ).then((res) =>
            setWeatherData((prevState): any => [
              ...prevState,
              {
                temperature: res.current.temp_c,
                wind: res.current.wind_kph,
                icon: res.current.condition.icon,
                condition: res.current.condition.text,
                city: res.location.name,
              },
            ])
          );
        });

        getDatabaseData();
      }
    };
  }, []);

  console.log("weatherData", weatherData);

  return (
    <View style={styles.container}>
      <WeatherApiIcon />

      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 20,
          rowGap: 20,
        }}
      >
        {weatherData ? (
          <FlatList
            data={weatherData}
            renderItem={({ item }) => (
              <WeatherCard
                icon={item.icon}
                city={item.city}
                wind={item.wind}
                temperature={item.temperature}
                condition={item.condition}
              />
            )}
          />
        ) : (
          <>
            <Text>Add your firs city</Text>
            <SearchWeatherInput />
          </>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },
});
