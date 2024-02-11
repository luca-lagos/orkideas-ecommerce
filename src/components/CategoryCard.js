import { StyleSheet, Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ item, lastItem, onHandleMenuModal }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ProductByCategory", { category: item });
        onHandleMenuModal(false);
      }}
      style={[styles.categoryCard, { maxWidth: lastItem ? "47%" : "100%" }]}
    >
      <Image
        style={styles.categoryImage}
        src="https://www.1800flowers.com/blog/wp-content/uploads/2021/05/Birthday-Flowers-Colors.jpg"
      />
      <Text style={styles.categoryTitle}>{item.replace("-", " ")}</Text>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    height: 200,
    backgroundColor: "white",
    padding: 12,
    margin: 6,
    borderRadius: 10,
    elevation: 5,
  },
  categoryImage: {
    height: 140,
    width: "100%",
    borderRadius: 10,
  },
  categoryTitle: {
    marginTop: 8,
    marginLeft: 5,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "darkgrey",
  },
});
