// import React, { useRef, useState } from "react";

// import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { Camera, CameraType } from "expo-camera";

// export const CreateScreen = ({ navigation }: any) => {
//   const [photo, setPhoto] = useState(null);
//   const [type, setType] = useState(CameraType.back);

//   const [isCameraReady, setIsCameraReady] = useState(false);

//   const toggleCameraType = () => {
//     setType((current) =>
//       current === CameraType.back ? CameraType.front : CameraType.back
//     );
//   };

//   const onCameraReady = () => {
//     setIsCameraReady(true);
//   };

//   const ref = useRef(null);
//   const getPhoto = async () => {
//     const data = await ref?.current?.takePictureAsync(null);
//     setPhoto(data.uri);
//     toggleCameraType();
//   };

//   const sendPhoto = () => {
//     console.log("navigation ===>", navigation);
//     navigation.navigate("Posts", { photo });
//     setPhoto(null);
//   };
//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         ref={ref}
//         type={type}
//         onCameraReady={onCameraReady}
//       >
//         {photo && (
//           <View style={styles.photoContainer}>
//             {/* <Text style={{ color: "red" }}>{photo}</Text> */}
//             <Image
//               source={{ uri: photo }}
//               style={{ width: 100, height: 100 }}
//             />
//           </View>
//         )}

//         <TouchableOpacity onPress={getPhoto} style={styles.snapContainer}>
//           <TouchableOpacity onPress={getPhoto} style={styles.clickContainer} />
//         </TouchableOpacity>
//       </Camera>
//       <View>
//         <TouchableOpacity onPress={sendPhoto} style={styles.sendContainer}>
//           <Text style={styles.publishBtn}>Publish</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     height: "70%",
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   snap: {
//     color: "#fff",
//   },
//   snapContainer: {
//     borderWidth: 1,
//     borderColor: "#fff",
//     width: 70,
//     height: 70,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 6,
//     backgroundColor: "#e7e5e7",
//   },
//   clickContainer: {
//     borderWidth: 2,
//     borderColor: "#999a9a",
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },
//   photoContainer: {
//     position: "absolute",
//     top: 20,
//     left: 10,
//     borderWidth: 1,
//     borderColor: "#fff",
//   },
//   sendContainer: {
//     backgroundColor: "#ff8c00",
//     borderRadius: 4,
//     width: 170,
//     height: 40,
//     alignSelf: "center",
//     marginTop: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   publishBtn: {
//     fontFamily: "Lora-bold",
//     color: "#fff",
//   },
// });

import React, { useState, useEffect, useRef } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

export const CreateScreen = ({ navigation }: any) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);

      await MediaLibrary.createAssetAsync(uri);
    }
  };

  const sendPhoto = () => {
    navigation.navigate("Posts", { photo });
    setPhoto(null);
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
    <View style={styles.container}>
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
                type === CameraType.back ? CameraType.front : CameraType.back
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
        <TouchableOpacity onPress={sendPhoto} style={styles.sendContainer}>
          <Text style={styles.publishBtn}>Publish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: {
    height: "80%",
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
    alignSelf: "center",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  publishBtn: {
    fontFamily: "Lora-bold",
    color: "#fff",
  },
});
