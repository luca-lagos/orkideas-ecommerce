import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import fonts from "../utils/global/fonts";
import colorCollection from "../utils/global/colors";

const ProductCard = ({ item, onHandleSearchModal, onSlider, isFirstItem, isLastItem }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={[
        styles.productCard,
        {
          flexDirection: onSlider ? "column" : "row",
          justifyContent: onSlider ? "center" : "space-between",
          width: onSlider ? 225 : "auto",
          height: onSlider ? 375 : "auto",
          marginLeft: isFirstItem ? 18 : 10,
          marginRight: isLastItem ? 18 : 10
        },
      ]}
      onPress={() => {
        navigation.navigate("ProductDetail", { productId: item.id });
        if (onHandleSearchModal !== null) {
          onHandleSearchModal(false);
        }
      }}
    >
      <Image
        style={[
          styles.productImage,
          {
            width: onSlider ? "100%" : "35%",
            height: onSlider ? "50%" : "100%",
          },
        ]}
        src={item.images[0]}
      />
      <View
        style={[
          styles.productInfo,
          {
            width: onSlider ? "100%" : "65%",
            alignItems: onSlider ? "center" : "flex-start",
          },
        ]}
      >
        <Text style={[styles.productTitle, { width: onSlider ? "auto" : 200 }]}>
          {item.title}
        </Text>
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
    margin: 6,
    padding: 12,
    borderRadius: 10,
    elevation: 5,
    display: "flex",
    alignItems: "center",
    gap: 25,
  },
  productImage: {
    borderRadius: 10,
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  productTitle: {
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
