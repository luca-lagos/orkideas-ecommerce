import { StyleSheet, Text, View, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import colorCollection from "../utils/global/colors";
import { useNavigation } from "@react-navigation/native";

const NavigationButtons = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-back" size={20} color={colorCollection.textlight} />
      </Pressable>
      <Pressable style={styles.button} onPress={() => {
        navigation.navigate("Home")
      }}>
        <Icon name="home" size={20} color={colorCollection.textlight} />
      </Pressable>
    </View>
  );
};

export default NavigationButtons;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: colorCollection.textlight,
  },
  button: {
    width: 60,
    backgroundColor: colorCollection.darkviolet,
    padding: 5,
    borderRadius: 50,
  },
});
