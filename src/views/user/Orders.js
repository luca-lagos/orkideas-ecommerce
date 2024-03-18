import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import NavigationButtons from "../../components/navigation/NavigationButtons";
import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "../../app/services/profileService";
import colorCollection from "../../utils/global/colors";
import OrderDetail from "../modal/OrderDetail";
import { Icon } from "react-native-elements";

const Orders = () => {
  const [modalOrderVisible, setModalOrderVisible] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  const user = useSelector((state) => state.auth);
  const { data: orders } = useGetAllOrdersQuery(user.localId);

  useEffect(() => {
    setModalOrderVisible(false);
  }, []);

  console.log(orders);

  const HandleOpenModal = (item) => {
    setOrderDetail(item);
    setModalOrderVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          style={styles.ordersBanner}
          src="https://www.1800flowers.com/blog/wp-content/uploads/2021/05/Birthday-Flowers-Colors.jpg"
          imageStyle={{
            backgroundColor: colorCollection.textdark,
            opacity: 0.7,
          }}
        >
          <View style={styles.ordersBannerView}>
            <Text style={styles.ordersBannerText}>MY ORDERS</Text>
          </View>
        </ImageBackground>
        <NavigationButtons />
        {orders !== undefined ? (
          <FlatList
            style={styles.ordersList}
            data={orders}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={styles.orderButton}
                  onPress={() => HandleOpenModal(item)}
                >
                  <View>
                    <Text style={styles.orderId}>Order: {item.id}</Text>
                    <Text style={styles.orderDate}>
                      Created at: {item.createdAt}
                    </Text>
                  </View>
                  <Icon name="info" size={35} color={colorCollection.violet} />
                </Pressable>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.notFoundView}>
            <Icon name="help" size={120} color={colorCollection.darkviolet} />
            <Text style={styles.notFoundText}>Orders not found</Text>
          </View>
        )}
      </View>
      <OrderDetail
        modalOrderVisible={modalOrderVisible}
        passModalOrderVisible={setModalOrderVisible}
        order={orderDetail}
      />
    </>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colorCollection.lightviolet,
  },
  ordersList: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  ordersBanner: {
    width: "100%",
    height: 100,
  },
  ordersBannerView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  ordersBannerText: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
  orderButton: {
    backgroundColor: "white",
    marginVertical: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 13,
    fontStyle: "italic",
  },
  notFoundView: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 50,
    height: "70%",
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
