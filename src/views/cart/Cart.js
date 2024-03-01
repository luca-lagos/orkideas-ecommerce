import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import CartItem from "../../components/cart/CartItem";
import React from "react";
import { useSelector } from "react-redux";
import colorCollection from "../../utils/global/colors";
import NavigationButtons from "../../components/navigation/NavigationButtons";
import fonts from "../../utils/global/fonts";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <View style={styles.container}>
      <NavigationButtons />
      <FlatList
        style={styles.cartItemList}
        data={cart.items}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <CartItem item={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.confirmContainer}>
        <View style={styles.totalPrice}>
          <Text style={styles.cartText}>Total:</Text>
          <Text style={[styles.cartText, {fontSize: 30}]}>${cart.total}</Text>
        </View>
        <Pressable style={styles.confirmButton}>
          <Text style={[styles.cartText, {color: colorCollection.textlight, textAlign: "center"}]}>CONFIRM</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colorCollection.lightviolet,
  },
  cartItemList: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  confirmContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  totalPrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    backgroundColor: colorCollection.textlight,
    padding: 15,
    borderRadius: 10,
  },
  cartText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: fonts.Josefin,
  },
  confirmButton: {
    backgroundColor: colorCollection.violetbutton,
    paddingHorizontal: 15,
    paddingVertical: 20,
    elevation: 5,
    borderRadius: 10,
  },
});
