import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import CartItem from "../../components/cart/CartItem";
import React from "react";
import { useSelector } from "react-redux";
import colorCollection from "../../utils/global/colors";
import NavigationButtons from "../../components/navigation/NavigationButtons";
import fonts from "../../utils/global/fonts";
import { usePostOrderMutation } from "../../app/services/cartService";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Notification from "../../components/notifications/Notification";
import { deleteCart } from "../../features/cart/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { HandleIntegrateMP } from "../../utils/payment/MPIntegration";
import { openBrowserAsync } from "expo-web-browser";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const localId = useSelector((state) => state.auth.localId);
  const [triggerAddOrder] = usePostOrderMutation();
  const [notification, setNotification] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(null);
  const [navigate, setNavigate] = useState(null);
  const navigation = useNavigation();

  const HandleAddOrder = async () => {
    if (localId != "") {
      const createdAt = new Date().toLocaleString();
      const order = {
        createdAt,
        ...cart,
      };
      await triggerAddOrder({ localId, order });
      dispatch(deleteCart());
      setSuccess(true);
      setError(false);
      setTitle("Order created successfully");
      setNavigate("Orders");
      setNotification(true);
    } else {
      navigation.navigate("Login");
    }
  };

  const HandleOpenMP = async () => {
    const data = await HandleIntegrateMP(cart.items);
    if (!data) {
      return console.log("HUBO UN ERROR");
    } else {
      openBrowserAsync(data);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <NavigationButtons />
        {cart.total !== 0 ? (
          <>
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
                <Text style={[styles.cartText, { fontSize: 30 }]}>
                  ${cart.total}
                </Text>
              </View>
              <Pressable style={styles.confirmButton} onPress={HandleOpenMP}>
                <Text
                  style={[
                    styles.cartText,
                    { color: colorCollection.textlight, textAlign: "center" },
                  ]}
                >
                  CONFIRM
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.notFoundView}>
            <Icon name="help" size={120} color={colorCollection.darkviolet} />
            <Text style={styles.notFoundText}>Products not found</Text>
          </View>
        )}
      </View>
      <Notification
        modalVisible={notification}
        title={title}
        navigate={navigate}
        onSuccess={success}
        onError={error}
      />
    </>
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
    marginVertical: 15,
  },
  confirmContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: -15,
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
  notFoundView: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 50,
    height: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colorCollection.darkviolet,
    textAlign: "center",
  },
});
