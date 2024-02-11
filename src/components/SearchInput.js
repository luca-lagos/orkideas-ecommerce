import {
    StyleSheet,
    TextInput,
    View,
    Pressable,
  } from "react-native";
  import { Icon } from "react-native-elements";
  import React from "react";

const SearchInput = ({ onHandleViewScreen, query, onSearchQuery }) => {
  return (
    <View style={styles.searchBar}>
      <Pressable
        style={styles.searchButton}
        onPress={() => onHandleViewScreen(false)}
      >
        <Icon name="arrow-back" size={25} color="white" />
      </Pressable>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={query}
        onChangeText={onSearchQuery}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchBar: {
    height: 110,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#696969",
  },
  searchInput: {
    width: "83%",
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
  },
});
