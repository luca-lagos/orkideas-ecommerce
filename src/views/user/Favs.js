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
import { useGetAllFavsQuery } from "../../app/services/profileService";
import colorCollection from "../../utils/global/colors";
import { Icon } from "react-native-elements";
import WarningModal from "../modal/WarningModal";
import ProductCard from "../../components/shop/ProductCard";
import { useRoute } from "@react-navigation/native";

const Favs = () => {
  const route = useRoute();
  const [deleteFavsModal, setDeleteFavsModal] = useState(false);
  const user = useSelector((state) => state.auth);
  const localId = user.localId; /*route.params.localId;*/
  const { data: favs } = useGetAllFavsQuery(localId);
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
            <Text style={styles.ordersBannerText}>MY FAVS</Text>
          </View>
        </ImageBackground>
        <NavigationButtons />
        {favs !== undefined ? (
          <FlatList
            style={styles.ordersList}
            data={favs}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => {
              return (
                <ProductCard
                  item={item}
                  onHandleSearchModal={null}
                  onSlider={false}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.notFoundView}>
            <Icon name="help" size={120} color={colorCollection.darkviolet} />
            <Text style={styles.notFoundText}>Favs not found</Text>
          </View>
        )}
        <Pressable
          style={styles.deleteFavsContainer}
          onPress={() => {
            setDeleteFavsModal(true);
          }}
        >
          <Text style={styles.deleteFavsTitle}>CLEAR LIST</Text>
        </Pressable>
      </View>
      <WarningModal
        modalVisible={deleteFavsModal}
        passModalVisible={setDeleteFavsModal}
        isLogout={false}
        isDeleteFavs={true}
        localId={localId}
      />
    </>
  );
};

export default Favs;

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
  deleteFavsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorCollection.red,
    height: 60,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  deleteFavsTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colorCollection.white,
  },
});
