import { StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../shop/ProductCard";
import { Image, Pressable } from "react-native";

const SliderCard = ({
  isImage,
  isBannerImage,
  isProduct,
  item,
  isFirstItem,
  isLastItem,
}) => {
  const navigation = useNavigation();

  return (
    <>
      {isImage ? (
        <Image src={item} style={styles.image} />
      ) : isBannerImage ? (
        <Pressable
          onPress={() => {
            navigation.navigate("ProductByCategory", {
              category: item.category,
            });
          }}
        >
          <Image src={item.image} style={styles.bannerImage} />
        </Pressable>
      ) : (
        isProduct && (
          <ProductCard
            item={item}
            onSlider={true}
            onHandleSearchModal={null}
            isFirstItem={isFirstItem}
            isLastItem={isLastItem}
          />
        )
      )}
    </>
  );
};

export default SliderCard;

const styles = StyleSheet.create({
  image: {
    height: 300,
    minWidth: 351.2,
    resizeMode: "cover",
  },
  bannerImage: {
    height: 190,
    minWidth: 411.5,
  },
});
