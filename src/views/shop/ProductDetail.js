import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { Icon } from "react-native-elements";
import Slider from "../../components/slider/Slider";
import NavigationButtons from "../../components/navigation/NavigationButtons";
import fonts from "../../utils/global/fonts";
import colorCollection from "../../utils/global/colors";
import AddCartItemButton from "../../components/shop/AddCartItemButton";

const ProductDetail = () => {
  const route = useRoute();
  const productId = route.params.productId;
  const products = route.params.products;
  const [productById, setProductById] = useState({});
  const [productFav, setProductFav] = useState(false);

  const onHandleFavProduct = () => {
    setProductFav(!productFav);
  };

  useEffect(() => {
    const results = products.find((item) => item.id === productId);
    setProductById(results);
  }, [productById]);

  return (
    <>
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
        <Slider images={productById.images} categoryLink={false} />
        <AddCartItemButton initialValue={1} product={productById} />
      </View>
    </View>
    </>
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
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    fontFamily: fonts.Josefin,
    width: "80%",
  },
});
