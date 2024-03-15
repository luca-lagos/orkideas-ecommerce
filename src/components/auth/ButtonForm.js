import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import colorCollection from "../../utils/global/colors";

const ButtonForm = ({ title, onPress, isGoogle }) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: isGoogle
            ? colorCollection.red
            : colorCollection.violet,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default ButtonForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 17,
    color: "white",
  },
});
