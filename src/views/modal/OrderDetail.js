import {
  StyleSheet,
  Text,
  Modal,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import OrderItem from "../../components/order/OrderItem";
import colorCollection from "../../utils/global/colors";
import fonts from "../../utils/global/fonts";

const OrderDetail = ({ modalOrderVisible, passModalOrderVisible, order }) => {
  return (
    <Modal animationType="fade" visible={modalOrderVisible}>
      <View style={styles.container}>
        <Pressable
          style={styles.closeModalButton}
          onPress={() => {
            passModalOrderVisible(false);
          }}
        >
          <Icon name="close" color={colorCollection.textlight} size={35} />
        </Pressable>
        <View style={styles.orderContainer}>
          <Text style={styles.orderTitle}>ORDER: {order.id}</Text>
          <FlatList
            style={styles.orderItemList}
            data={order.items}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => {
              return <OrderItem item={item} />;
            }}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.totalPrice}>
            <Text style={styles.orderText}>Total:</Text>
            <Text style={styles.orderText}>${order.total}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorCollection.textlight,
    gap: 25,
  },
  closeModalButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: colorCollection.textdark,
    borderRadius: 50,
  },
  orderContainer: {
    marginTop: 110,
  },
  orderTitle: {
    padding: 20,
    backgroundColor: colorCollection.darkviolet,
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  orderItemList: {
    marginHorizontal: 10,
  },
  totalPrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: colorCollection.violet,
    padding: 15,
    borderRadius: 10,
  },
  orderText: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: fonts.Josefin,
    color: "white",
  },
});
