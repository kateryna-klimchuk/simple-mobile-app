import { Image } from "react-native";

export function WeatherApiIcon() {
  return (
    <Image
      style={{
        width: 110,
        height: 50,
        marginTop: 70,
        marginLeft: 10,
        alignSelf: "flex-start",
      }}
      source={{
        uri: "https://cdn.weatherapi.com/v4/images/weatherapi_logo.png",
      }}
    />
  );
}
