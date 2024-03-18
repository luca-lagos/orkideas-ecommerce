import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapPreview from "./MapPreview";
import * as Location from "expo-location";
import { google_api } from "../../app/firebase/googleAPI";
import colorCollection from "../../utils/global/colors";
import fonts from "../../utils/global/fonts";
import { Icon } from "react-native-elements";

const LocationSelector = ({ location, passLocation }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [coords, setCoords] = useState({ latitude: "", longitude: "" });
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");
  const opacity = useState(new Animated.Value(0))[0];

  const fadeInLoading = () => {
    Animated.timing(opacity, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutLoading = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Premission denied");
        return;
      }
      let result = await Location.getCurrentPositionAsync();
      setCoords({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (coords.latitude) {
        fadeInLoading();
        const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${google_api.mapStatic}`;
        const response = await fetch(url_reverse_geocode);
        const data = await response.json();
        let currentAddress = data.results[0].formatted_address;
        console.log(currentAddress);
        if (currentAddress !== "" || undefined) {
          fadeOutLoading();
        }
        setAddress(currentAddress);
        passLocation({
          address: currentAddress,
          coords: coords,
        });
      }
    })();
  }, [coords]);

  const onSearchLocation = async (e) => {
    setSearch(e);
  };

  const HandleConfirmLocation = async () => {
    const geocodeLocation = await Location.geocodeAsync(search);
    setCoords({
      latitude: geocodeLocation[0].latitude,
      longitude: geocodeLocation[0].longitude,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a location..."
          onChangeText={onSearchLocation}
        />
        <Pressable style={styles.searchButton} onPress={HandleConfirmLocation}>
          <Icon name="search" size={22} color={colorCollection.lightviolet} />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <MapPreview latitude={coords.latitude} longitude={coords.longitude} />
        <Animated.View style={[styles.loadingContainer, { opacity }]}>
          <View style={{ marginTop: -40 }}>
            <Icon name="info" size={60} color={colorCollection.textlight} />
            <Text style={styles.loadingText}>
              Searching for the nearest location...
            </Text>
          </View>
        </Animated.View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
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
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: colorCollection.darkviolet,
    marginBottom: 10,
  },
  addressContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: colorCollection.darkviolet,
    padding: 20,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  addressText: {
    color: colorCollection.textlight,
    textAlign: "center",
  },
  loadingContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    gap: 5,
    top: 0,
    height: 250,
    backgroundColor: colorCollection.textdark,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  loadingText: {
    width: 150,
    textAlign: "center",
    color: colorCollection.textlight,
    fontWeight: "bold",
  },
  searchContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    width: "83%",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: colorCollection.textlight,
    padding: 2,
    fontFamily: fonts.Josefin,
    fontSize: 14,
    marginBottom: 20,
  },
  searchButton: {
    width: 45,
    marginTop: -20,
    height: 45,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colorCollection.lightviolet,
    backgroundColor: colorCollection.darkviolet,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
