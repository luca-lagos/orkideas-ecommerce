import { StyleSheet, View, StatusBar, FlatList, Image } from "react-native";
import React from "react";

const SliderImages = ({ images }) => {
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
          return <Image src={item} style={styles.image} />;
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
    elevation: 10,
  },
  image: {
    height: 300,
    minWidth: 351.5,
    resizeMode: "cover",
  },
});
