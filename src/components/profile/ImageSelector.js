import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
import colorCollection from "../../utils/global/colors";

const ImageSelector = ({ image, passImage }) => {
  const pickImageLibrary = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [6, 4],
        quality: 0.3,
        base64: true,
      });
      if (!result.canceled) {
        passImage("data:image/jpeg;base64," + result.assets[0].base64);
      }
    }
  };
  const pickImageCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [6, 4],
        quality: 0.3,
        base64: true,
      });
      if (!result.canceled) {
        passImage("data:image/jpeg;base64," + result.assets[0].base64);
      }
    }
  };
  return (
    <>
      <Text style={styles.title}>Image selector</Text>
      <ImageBackground
        style={styles.container}
        source={
          image !== "" || undefined
            ? { uri: image }
            : require("../../../assets/images/user.jpg")
        }
        imageStyle={{
          backgroundColor: colorCollection.textdark,
          opacity: 0.7,
          borderRadius: 10,
        }}
      >
        <Pressable style={[styles.button, { left: 12 }]} onPress={pickImageCamera}>
          <Icon
            name="photo-camera"
            size={30}
            color={colorCollection.lightviolet}
          />
        </Pressable>
        <Pressable style={[styles.button, { right: 12 }]} onPress={pickImageLibrary}>
          <Icon
            name="photo-library"
            size={30}
            color={colorCollection.lightviolet}
          />
        </Pressable>
      </ImageBackground>
    </>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    marginBottom: 30,
  },
  button: {
    position: "absolute",
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colorCollection.lightviolet,
    backgroundColor: colorCollection.darkviolet,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: colorCollection.darkviolet,
    marginBottom: 20,
  },
});
