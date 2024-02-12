import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import NavigationButtons from "../components/NavigationButtons";
import colorCollection from "../utils/global/colors";

const ProductByCategory = () => {
  const route = useRoute();
  const categorySelected = route.params.category;
  const products = route.params.products;
  const [productListByCategory, setProductListByCategory] = useState([]);

  useEffect(() => {
    if (categorySelected) {
      const newData = products.filter(
        (item) => item.category === categorySelected
      );
      setProductListByCategory(newData);
    }
  }, [categorySelected]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.categoryBanner}
        src="https://www.1800flowers.com/blog/wp-content/uploads/2021/05/Birthday-Flowers-Colors.jpg"
        imageStyle={{backgroundColor: colorCollection.textdark, opacity: 0.7}}

      >
        <View style={styles.categoryBannerView}>
          <Text style={styles.categoryBannerText}>{categorySelected.replace("-", " ")}</Text>
        </View>
      </ImageBackground>
      <NavigationButtons/>
      <FlatList
        style={styles.productList}
        data={productListByCategory}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <ProductCard item={item} onHandleSearchModal={null}/>;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ProductByCategory;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colorCollection.lightviolet,
  },
  productList: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  categoryBanner: {
    width: "100%",
    height: 100,
  },
  categoryBannerView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryBannerText: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  }
});
