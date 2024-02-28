import { StyleSheet, View, StatusBar, FlatList, Animated } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import SliderCard from "./SliderCard";
import Pagination from "./Pagination";

const Slider = ({ images, categoryLink, products }) => {
  const [sliderList, setSliderList] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [isBannerImage, setIsBannerImage] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images !== undefined && categoryLink === false) {
      setSliderList(images);
      setIsImage(true);
      setIsBannerImage(false);
      setIsProduct(false);
    } else if (images !== undefined && categoryLink === true) {
      setSliderList(images);
      setIsImage(false);
      setIsBannerImage(true);
      setIsProduct(false);
    } else {
      setSliderList(products);
      setIsImage(false);
      setIsBannerImage(false);
      setIsProduct(true);
    }
  }, [images, products]);

  const HandleOnScroll = (e) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(e);
  };

  const HandleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        style={styles.flatList}
        data={sliderList}
        horizontal
        pagingEnabled={isProduct ? false : true}
        showsHorizontalScrollIndicator={
          isProduct || isBannerImage ? false : true
        }
        onScroll={isBannerImage || isImage ? HandleOnScroll : null}
        onViewableItemsChanged={HandleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item, idx }) => {
          return (
            <SliderCard
              isFirstItem={sliderList.at(0) === item ? true : false}
              isLastItem={
                sliderList.at(sliderList.length - 1) === item ? true : false
              }
              item={item}
              isImage={isImage}
              isBannerImage={isBannerImage}
              isProduct={isProduct}
            />
          );
        }}
        _keyExtractor={(item) => item}
      />
      {(isImage || isBannerImage) && (
        <Pagination data={sliderList} scrollX={scrollX} index={index} />
      )}
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    elevation: 10,
  },
});
