import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colorCollection from "../../utils/global/colors";
import fonts from "../../utils/global/fonts";

const InputForm = ({ label, onChangeText, error, value, isSecure }) => {
  return (
    <View
      style={[
        styles.container,
        {
          width:
            label == "Password"
              ? "85%"
              : label == "Confirm password"
              ? "85%"
              : "100%",
        },
      ]}
    >
      <Text style={styles.title}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={isSecure}
      />
      {error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 30,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: colorCollection.darkviolet,
  },
  input: {
    height: 30,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: colorCollection.textlight,
    padding: 2,
    fontFamily: fonts.Josefin,
    fontSize: 14,
  },
});
