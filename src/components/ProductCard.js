import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import fonts from "../utils/global/fonts";
import colorCollection from "../utils/global/colors";

const ProductCard = ({ item, onHandleSearchModal }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.productCard}
      onPress={() => {
        navigation.navigate("ProductDetail", { productId: item.id });
        if (onHandleSearchModal !== null) {
          onHandleSearchModal(false);
        }
      }}
    >
      <Image style={styles.productImage} src={item.images[0]} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.productRating}>
          <Text style={styles.productRatingText}>{item.rating}</Text>
          <AirbnbRating
            reviews={["Poor", "Bad", "Ok", "Good", "Excellent"]}
            count={5}
            defaultRating={item.rating}
            showRating={false}
            isDisabled
            size={12}
            selectedColor={colorCollection.violet}
          />
        </View>
        <View style={styles.productPrice}>
          <Text style={styles.productPriceOriginal}>${item.price}</Text>
          <Text style={styles.productPriceDiscount}>
            {item.discountPercentage}% OFF
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    margin: 6,
    borderRadius: 10,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 25,
  },
  productImage: {
    width: "35%",
    height: "100%",
    borderRadius: 10,
  },
  productInfo: {
    width: "65%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },
  productTitle: {
    width: 200,
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: colorCollection.darkviolet,
    fontFamily: fonts.Josefin,
  },
  productRating: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  productRatingText: {
    fontSize: 13,
    fontWeight: "bold",
    color: colorCollection.textdark,
    fontFamily: fonts.Josefin,
  },
  productPrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 7,
    marginTop: 10,
  },
  productPriceOriginal: {
    fontSize: 25,
    fontWeight: "bold",
    color: colorCollection.textdark,
    fontFamily: fonts.Josefin,
  },
  productPriceDiscount: {
    fontSize: 14,
    fontWeight: "bold",
    color: colorCollection.violet,
  },
});
