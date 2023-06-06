import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./PostsScreen";
import { CreateScreen } from "./CreateScreen";
import { ProfileScreen } from "./ProfileScreen";

const Tab = createBottomTabNavigator();

export const HomeScreen = ({ navigation, route }: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* <Text style={styles.text}>
          {route.params?.name
            ? ` Hello, ${route.params.name}, glad you're here!`
            : " Hi, glad you're here!"}
        </Text> */}
        <Tab.Navigator>
          <Tab.Screen name="Posts" component={PostsScreen} />
          <Tab.Screen name="Create" component={CreateScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
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
    fontSize: 22,
    marginTop: 10,
  },
});
