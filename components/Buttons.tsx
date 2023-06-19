import { AntDesign, Feather, Entypo } from "@expo/vector-icons";

const locationButton = (props: {
  focused: boolean;
  color: string;
  size: number;
}) => (
  <Entypo
    name="location-pin"
    size={props.size}
    color={props.color}
    focused={props.focused}
  />
);
const addButton = (props: {
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

export const Button = {
  location: locationButton,
  add: addButton,
  user: userButton,
};
