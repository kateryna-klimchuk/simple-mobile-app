import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";

const initialState = {
  photo: "",
  description: "",
  location: null,
};

export const CreateScreen = ({ navigation }: any) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);
  const [post, setPost] = useState(initialState);
  const [cameraStatus, setCameraStatus] = useState(false);

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);

      await MediaLibrary.createAssetAsync(uri);

      const userLocation = await Location.getCurrentPositionAsync({});

      setPost((prevState) => ({
        ...prevState,
        photo: uri,
      }));
      setLocation(userLocation);
    }
  };

  const sendPost = () => {
    navigation.navigate("DefaultScreen", { ...post, location });
    setPhoto(null);
    setPost(initialState);
    setLocation({});
  };

  const deletePost = () => {
    setPhoto(null);
    setLocation({});
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : undefined}
        >
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => {
              setCameraRef(ref);
            }}
          >
            {photo && (
              <View style={styles.photoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            )}
            <View style={styles.photoView}>
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              >
                <MaterialIcons name="flip-camera-ios" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <View style={styles.takePhotoOut}>
                  <View style={styles.takePhotoInner} />
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Description"}
              value={post.description}
              onChangeText={(value) =>
                setPost((prevState) => ({ ...prevState, description: value }))
              }
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={sendPost} style={styles.sendContainer}>
                <Text style={styles.publishBtn}>Publish</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteContainer}
                onPress={deletePost}
              >
                <Text style={styles.publishBtn}>
                  <AntDesign name="delete" size={22} color="black" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  camera: {
    height: "75%",
    justifyContent: "flex-end",
  },
  photoView: {
    backgroundColor: "transparent",
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },

  flipContainer: {
    alignSelf: "flex-end",
  },

  button: { marginBottom: 10 },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
  photoContainer: {
    position: "absolute",
    top: 20,
    left: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  sendContainer: {
    backgroundColor: "#ff8c00",
    borderRadius: 4,
    width: 170,
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  publishBtn: {
    fontFamily: "Lora-bold",
    color: "#fff",
  },
  deleteContainer: {
    borderRadius: 4,
    width: 70,
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    marginLeft: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginTop: 10,
    borderColor: "#d3d3d3",
    height: 30,
    width: "90%",
    alignSelf: "center",
  },
});
