import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { supabase } from "../../supabase";
import { Dimensions } from "react-native";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export const RegisterScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log("data signup", data);

    if (error) Alert.alert(error.message);
    setLoading(false);
    console.log(navigation);

    navigation.navigate("Posts");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Text
            style={{
              paddingBottom: 20,
              fontSize: 20,
              alignSelf: "center",
              fontFamily: "Lora-regular",
            }}
          >
            Registration
          </Text>

          <View style={styles.form}>
            <View>
              <Text style={{ paddingBottom: 4, fontFamily: "Lora-regular" }}>
                Full name
              </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(value) => setName(value)}
              />
            </View>
            <View>
              <Text
                style={{
                  paddingBottom: 4,
                  paddingTop: 8,
                  fontFamily: "Lora-regular",
                }}
              >
                Email address
              </Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(value) => setEmail(value)}
                autoCapitalize={"none"}
              />
            </View>
            <View>
              <Text
                style={{
                  paddingBottom: 4,
                  paddingTop: 8,
                  fontFamily: "Lora-regular",
                }}
              >
                Password
              </Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={(value) => setPassword(value)}
                autoCapitalize={"none"}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              disabled={loading}
              onPress={() => signUpWithEmail()}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontFamily: "Lora-bold",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 10,
                marginBottom: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginRight: 6,
                  fontFamily: "Lora-regular",
                }}
              >
                Already signed up?
              </Text>
              <Text
                style={{
                  color: "#483d8b",
                  fontSize: 16,
                  textDecorationLine: "underline",
                  fontFamily: "Lora-regular",
                }}
                onPress={() => navigation.navigate("Login")}
              >
                Sign in.
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "blue",
    fontSize: 22,
  },
  form: {
    width: 320,
    marginBottom: 110,
  },
  input: {
    height: 40,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#f8f8ff",
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 4,
    marginTop: 20,
    backgroundColor: "#ff8c00",
  },
});
