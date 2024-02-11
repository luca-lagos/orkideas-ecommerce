import { StyleSheet, Text, View, Pressable, Button, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { Icon } from "react-native-elements";
import SliderImages from "../components/SliderImages";

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
    if (productId) {
      const newData = products.filter((item) => item.id === productId);
      console.log(newData[0]);
      setProductById(newData[0]);
      console.log(productById.images);
    }
  }, [productId]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{productById.title}</Text>
        <Pressable onPress={onHandleFavProduct}>
          <Icon
            name="favorite"
            size={35}
            color={productFav ? "red" : "#515151"}
          />
        </Pressable>
      </View>
      <SliderImages images={productById?.images} />
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
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    display: "flex",
    flexDirection: "column",
    gap: 15,
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
  },
  pricePanel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  price: {
    fontSize: 50,
    fontWeight: "bold",
  },
  discount: {
    fontSize: 20,
  },
  countContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  count: {
    width: 45,
    height: 55,
    backgroundColor: "red",
    display: "flex",
    borderRadius: 10,
  },
  buttonCount: {
    width: 45,
    height: 55,
    backgroundColor: "#696969",
    display: "flex",
    borderRadius: 10,
  },
  buttonCountDisabled: {
    width: 45,
    height: 55,
    backgroundColor: "#979797",
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
    backgroundColor: "#515151",
    height: 60,
    borderRadius: 50,
  },
  addToCartText: {
    textAlign: "center",
    marginTop: 14,
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
  },
});
