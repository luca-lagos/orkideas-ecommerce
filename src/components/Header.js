import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import colorCollection from "../utils/global/colors";
import fonts from "../utils/global/fonts";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../app/services/profileService";

const Header = ({ onHandleMenuModal, onHandleSearchModal }) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { data: profile } = useGetProfileQuery(user.localId);

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
            if (user.idToken) {
              navigation.navigate("Account", {
                profile: profile,
                localId: user.localId,
              });
            } else {
              navigation.navigate("Login");
            }
          }}
          marginRight={-7}
        >
          {user.idToken ? (
            <Image
              style={styles.userImage}
              source={{ uri: profile?.userImage }}
            />
          ) : (
            <Icon
              name="account-circle"
              color={colorCollection.textlight}
              size={35}
            />
          )}
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          {cart.items.length > 0 && (
            <Text style={styles.cartCounter}>{cart.items.length}</Text>
          )}
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
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: colorCollection.textlight,
  },
  cartCounter: {
    position: "absolute",
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: colorCollection.red,
    color: "white",
    borderRadius: 50,
    zIndex: 1,
    right: 8,
    top: -8,
  },
});
