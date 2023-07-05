import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export function SearchWeatherInput() {
  const [location, setLocation] = useState("");
  const [value, setValue] = useState("");

  const getLocationWeather = () => {
    setValue(location);
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <View style={styles.inputContainer}>
        <Entypo name="location-pin" size={28} color="#228b22" />
        <TextInput
          style={styles.input}
          value={location}
          autoCapitalize="none"
          onChangeText={(value) => setLocation(value)}
          placeholder="Search for a city"
        />
      </View>
      <TouchableOpacity
        onPress={getLocationWeather}
        style={{ ...styles.sendContainer, marginBottom: 10 }}
      >
        <Text style={styles.publishBtn}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
