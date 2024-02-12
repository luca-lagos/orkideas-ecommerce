import { StyleSheet, Text, View, Pressable, Button, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { Icon } from "react-native-elements";
import SliderImages from "../components/SliderImages";
import NavigationButtons from "../components/NavigationButtons";
import fonts from "../utils/global/fonts";
import colorCollection from "../utils/global/colors";

const ProductDetail = () => {
  const route = useRoute();
  const productId = route.params.productId;
  const products = route.params.products;
  const [productById, setProductById] = useState({});
  const [productCount, setProductCount] = useState(1);
  const [productFav, setProductFav] = useState(false);

  const onHandleFavProduct = () => {
    setProductFav(!productFav);
  };

  useEffect(() => {
    const results = products.find((item) => item.id === productId);
    setProductById(results);
  }, [productId]);

  return (
    <View style={styles.container}>
      <NavigationButtons />
      <View style={styles.productContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{productById.title}</Text>
          <Pressable onPress={onHandleFavProduct}>
            <Icon
              name="favorite"
              size={35}
              color={
                productFav ? colorCollection.red : colorCollection.textdark
              }
            />
          </Pressable>
        </View>
        <SliderImages images={productById.images} />
        <View style={styles.pricePanel}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${productById.price}</Text>
            <Text style={styles.discount}>
              {productById.discountPercentage}% OFF
            </Text>
          </View>
          <View style={styles.countContainer}>
            <Pressable
              style={
                productCount == 1
                  ? styles.buttonCountDisabled
                  : styles.buttonCount
              }
              disabled={productCount === 1 ? true : false}
              onPress={() => {
                setProductCount(productCount - 1);
              }}
              title="-"
            >
              <Text style={styles.countText}>-</Text>
            </Pressable>
            <View style={styles.count}>
              <Text style={styles.countText}>{productCount}</Text>
            </View>
            <Pressable
              style={
                productCount == 10
                  ? styles.buttonCountDisabled
                  : styles.buttonCount
              }
              disabled={productCount === 10 ? true : false}
              onPress={() => {
                setProductCount(productCount + 1);
              }}
              title="+"
            >
              <Text style={styles.countText}>+</Text>
            </Pressable>
          </View>
        </View>
        <Pressable style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorCollection.lightviolet,
  },
  productContainer: {
    margin: 15,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    fontFamily: fonts.Josefin,
  },
  pricePanel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
  },
  price: {
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: fonts.Josefin,
    color: colorCollection.textdark,
  },
  discount: {
    fontSize: 17,
    fontFamily: fonts.Josefin,
    color: colorCollection.violet,
    marginTop: -7,
    textAlign: "right",
    marginRight: 7,
  },
  countContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 15,
  },
  count: {
    width: 45,
    height: 55,
    backgroundColor: colorCollection.violet,
    display: "flex",
    borderRadius: 10,
  },
  buttonCount: {
    width: 45,
    height: 55,
    backgroundColor: colorCollection.darkviolet,
    display: "flex",
    borderRadius: 10,
  },
  buttonCountDisabled: {
    width: 45,
    height: 55,
    backgroundColor: colorCollection.disabled,
    display: "flex",
    borderRadius: 10,
  },
  countText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 12,
  },
  addToCartButton: {
    width: "100%",
    backgroundColor: colorCollection.darkviolet,
    height: 60,
    borderRadius: 50,
  },
  addToCartText: {
    textAlign: "center",
    marginTop: 14,
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
    fontFamily: fonts.Josefin,
  },
});
