import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import React from "react";

const Menu = ({ modalMenuVisible, onHandleMenuModal, categories }) => {
  return (
    <Modal animationType="fade" visible={modalMenuVisible}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Pressable
            style={styles.searchButton}
            onPress={() => onHandleMenuModal(false)}
          >
            <Icon name="arrow-back" size={25} color="white" />
          </Pressable>
          <TextInput
            style={styles.searchInput}
            placeholder="Search a category..."
          ></TextInput>
        </View>
          <FlatList
            style={styles.categoryList}
            data={categories}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => (
              <Pressable style={styles.categoryCard}>
                <Image
                  style={styles.categoryImage}
                  src="https://www.1800flowers.com/blog/wp-content/uploads/2021/05/Birthday-Flowers-Colors.jpg"
                />
                <Text style={styles.categoryTitle}>{item}</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item}
          />
        </View>
    </Modal>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#e8e8e8",
  },
  searchBar: {
    height: 110,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#696969",
  },
  searchInput: {
    width: "83%",
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
  },
  categoryList: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
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
    marginTop: 5,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "darkgrey",
  },
});
