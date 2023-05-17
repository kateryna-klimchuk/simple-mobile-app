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
} from "react-native";

export const LoginScreen = ({ navigation, route }: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Text
            style={{ paddingBottom: 20, fontSize: 20, alignSelf: "center" }}
          >
            Login
          </Text>

          <View style={styles.form}>
            <View>
              <Text style={{ paddingBottom: 4, paddingTop: 8 }}>
                Email address
              </Text>
              <TextInput style={styles.input} />
            </View>
            <View>
              <Text style={{ paddingBottom: 4, paddingTop: 8 }}>Password</Text>
              <TextInput style={styles.input} secureTextEntry={true} />
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
                Sign in
              </Text>
            </TouchableOpacity>
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
