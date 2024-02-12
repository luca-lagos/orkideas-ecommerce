import { StyleSheet, View, StatusBar, FlatList, Image } from "react-native";
import React from "react";

const SliderImages = ({images}) => {
  console.log(images);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        style={styles.flatList}
        data={images}
        horizontal
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View style={styles.imageContainer}>
              <Image src={item} style={styles.image} />
            </View>
          );
        }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default SliderImages;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    height: 300,
    width: "92%",
    borderRadius: 10,
  },
  imageContainer: {
    height: 300,
    width: "92%",
  },
  image: {
    height: 300,
    width: "92%",
    resizeMode: "cover",
  },
});
