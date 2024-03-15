import { StyleSheet, View, StatusBar, FlatList, Animated } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import SliderCard from "./SliderCard";
import Pagination from "./Pagination";

const Slider = ({ images, categoryLink, products }) => {
  const [isImage, setIsImage] = useState(false);
  const [isBannerImage, setIsBannerImage] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (categoryLink === false) {
      setIsImage(true);
      setIsBannerImage(false);
      setIsProduct(false);
    } else if (categoryLink === true) {
      setIsImage(false);
      setIsBannerImage(true);
      setIsProduct(false);
    } else {
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
    setIdx(viewableItems[0]);
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  return (
    <View
      style={[
        styles.container,
        {
          overflow: isImage ? "hidden" : "auto",
          borderRadius: isImage ? 10 : 0,
          zIndex: 1,
        },
      ]}
    >
      <StatusBar hidden />
      <FlatList
        data={isProduct ? products : images}
        horizontal
        pagingEnabled={isProduct ? false : true}
        showsHorizontalScrollIndicator={false}
        onScroll={isBannerImage || isImage ? HandleOnScroll : null}
        onViewableItemsChanged={HandleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => {
          return (
            <SliderCard
              isFirstItem={
                isProduct
                  ? products.at(0) === item
                    ? true
                    : false
                  : images.at(0) === item
                  ? true
                  : false
              }
              isLastItem={
                isProduct
                  ? products.at(products?.length - 1) === item
                    ? true
                    : false
                  : images.at(images?.length - 1) === item
                  ? true
                  : false
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
      {(isBannerImage || isImage) && (
        <Pagination
          data={isProduct ? products : images}
          scrollX={scrollX}
          index={idx}
        />
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
});
