import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import MapPreview from "./MapPreview";
import * as Location from "expo-location";
import { google_api } from "../../app/firebase/googleAPI";
import colorCollection from "../../utils/global/colors";

const LocationSelector = ({ location, passLocation }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loc, setLoc] = useState({ latitude: "", longitude: "" });
  const [address, setAddress] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Premission denied");
        return;
      }
      let result = await Location.getCurrentPositionAsync();
      setLoc({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    })();
  }, []);

  console.log(loc);

  useEffect(() => {
    (async () => {
      if (loc.latitude) {
        const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.latitude},${loc.longitude}&key=${google_api.mapStatic}`;
        const response = await fetch(url_reverse_geocode);
        const data = await response?.json();
        setAddress(data.results[0].formatted_address);
      }
    })();
  }, [loc]);

  useEffect(() => {
    const locationFormatted = {
      address,
      loc,
    };
    passLocation(locationFormatted);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map selector</Text>
      <View style={styles.imageContainer}>
        <MapPreview
          latitude={location.loc.latitude}
          longitude={location.loc.longitude}
        />
        <View style={styles.imageTextContainer}>
          <Text style={styles.imageText}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageTextContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    backgroundColor: colorCollection.darkviolet,
  },
  imageText: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    color: colorCollection.textlight,
    marginVertical: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: colorCollection.darkviolet,
    marginBottom: 20,
  },
});
