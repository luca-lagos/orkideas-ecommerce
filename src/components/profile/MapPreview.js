import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { google_api } from "../../app/firebase/googleAPI";

const MapPreview = ({ latitude, longitude }) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${latitude},${longitude}&key=${google_api.mapStatic}`;
  return (
    <Image
      style={styles.image}
      source={
        latitude
          ? { uri: mapPreviewUrl }
          : require("../../../assets/images/maps.png")
      }
    />
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
  },
});
