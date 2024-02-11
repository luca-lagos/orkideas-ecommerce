import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const Header = ({ onHandleMenuModal, onHandleSearchModal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.button}
          onPress={() => {
            onHandleMenuModal(true);
          }}
        >
          <Icon name="menu" color={"white"} size={35}/>
        </Pressable>
        <Pressable
          style={styles.search}
          onPress={() => {
            onHandleSearchModal(true);
          }}
          marginLeft={3}
          marginRight={5}
        >
          <Text>Search a product</Text>
          <Icon name="search" color={"#696969"} size={25} />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            console.log("OPEN CART");
          }}
          marginRight={-7}
        >
          <Icon name="account-circle" color={"white"} size={35} />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            console.log("OPEN CART");
          }}
        >
          <Icon name="shopping-cart" color={"white"} size={35} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 130,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "15%",
  },
  search: {
    width: "55%",
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#696969",
  },
});
