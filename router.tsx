import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { LoginScreen } from "./screens/auth/LoginScreen";
import { RegisterScreen } from "./screens/auth/RegisterScreen";

import { CreateScreen } from "./screens/mainScreens/CreateScreen";
import { HomeScreen } from "./screens/mainScreens/HomeScreen";
import { PostsScreen } from "./screens/mainScreens/PostsScreen";
import { ProfileScreen } from "./screens/mainScreens/ProfileScreen";

const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const useRoute = (isAuth: boolean) => {
  const postButton = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => (
    <AntDesign
      name="picture"
      size={props.size}
      color={props.color}
      focused={props.focused}
    />
  );
  const createButton = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => (
    <AntDesign
      name="plussquareo"
      size={props.size}
      color={props.color}
      focused={props.focused}
    />
  );
  const userButton = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => (
    <Feather
      name="user"
      size={props.size}
      color={props.color}
      focused={props.focused}
    />
  );

  if (isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="Registration"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          // options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: (props) => postButton(props),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: (props) => createButton(props),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: (props) => userButton(props),
        }}
      />
    </Tab.Navigator>
  );
};
