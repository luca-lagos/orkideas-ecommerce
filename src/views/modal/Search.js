import { Modal, StyleSheet, Text, View, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import ProductCard from "../../components/ProductCard";
import SearchInput from "../../components/SearchInput";
import colorCollection from "../../utils/global/colors";

const Search = ({ modalSearchVisible, onHandleSearchModal, products, onSearchProductQuery, searchProductQuery }) => {

  return (
    <Modal animationType="fade" visible={modalSearchVisible}>
      <View style={styles.container}>
        <SearchInput
          onHandleViewScreen={onHandleSearchModal}
          query={searchProductQuery}
          onSearchQuery={onSearchProductQuery}
        />
        {products.length === 0 ? (
          <View style={styles.notFoundView}>
            <Icon name="help" size={120} color={colorCollection.darkviolet} />
            <Text style={styles.notFoundText}>
              Please, search for your favourite product
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.productList}
            data={products}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return <ProductCard item={item} onHandleSearchModal={onHandleSearchModal}/>;
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </Modal>
  );
};

export default Search;

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
  notFoundView: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 50,
    height: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colorCollection.darkviolet,
    textAlign: "center",
  },
});
