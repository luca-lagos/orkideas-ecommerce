import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import colorCollection from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import { useNavigation } from "@react-navigation/native";

const Header = ({ onHandleMenuModal, onHandleSearchModal }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.button}
          onPress={() => {
            onHandleMenuModal(true);
          }}
        >
          <Icon name="menu" color={colorCollection.textlight} size={35} />
        </Pressable>
        <Pressable
          style={styles.search}
          onPress={() => {
            onHandleSearchModal(true);
          }}
          marginLeft={3}
          marginRight={5}
        >
          <Text style={styles.searchText}>Search a product</Text>
          <Icon name="search" color={colorCollection.textdark} size={25} />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("User");
          }}
          marginRight={-7}
        >
          <Icon
            name="account-circle"
            color={colorCollection.textlight}
            size={35}
          />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Icon
            name="shopping-cart"
            color={colorCollection.textlight}
            size={35}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorCollection.darkviolet,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  button: {
    width: "15%",
  },
  search: {
    width: "55%",
    backgroundColor: colorCollection.textlight,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: colorCollection.textdark,
  },
  searchText: {
    fontFamily: fonts.Josefin,
  },
});
