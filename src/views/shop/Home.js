import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import Slider from "../../components/slider/Slider";
import colorCollection from "../../utils/global/colors";
import { useRoute } from "@react-navigation/native";
import fonts from "../../utils/global/fonts";
import { useState, useEffect } from "react";

const Home = () => {
  const route = useRoute();
  const products = route.params.products;
  const promotions = route.params.promotions;
  const onSlider = route.params.onSlider;
  const [mostSelledProducts, setMostSelledProducts] = useState([]);
  const [mostPopularProducts, setMostPopularProducts] = useState([]);
  const [mostSearchedProducts, setMostSearchedProducts] = useState([]);
  const [mostNewedProducts, setMostNewedProducts] = useState([]);

  useEffect(() => {
    if (products) {
      const mostPopularList = products.sort((a, b) => b.rating - a.rating);
      setMostPopularProducts(mostPopularList.slice(0, 10));
    }
  }, [products]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Slider images={promotions} categoryLink={true} />
      </View>
      <View style={styles.sliderProductList}>
        <ImageBackground
          style={styles.sliderProductBanner}
          src="https://www.1800flowers.com/blog/wp-content/uploads/2021/05/Birthday-Flowers-Colors.jpg"
          imageStyle={{
            backgroundColor: colorCollection.textdark,
            opacity: 0.7,
            borderRadius: 10,
          }}
        >
          <View style={styles.sliderProductBannerView}>
            <Text style={styles.sliderProductBannerText}>most popular</Text>
          </View>
        </ImageBackground>
        <Slider products={mostPopularProducts} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colorCollection.lightviolet,
  },
  sliderProductList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  sliderProductBanner: {
    width: 375,
    height: 120,
    marginVertical: 20,
  },
  sliderProductBannerView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderProductBannerText: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
});
