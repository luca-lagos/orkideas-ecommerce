import { Modal, StyleSheet, Text, View, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import CategoryCard from "../../components/CategoryCard";
import SearchInput from "../../components/SearchInput";
import colorCollection from "../../utils/global/colors";

const Menu = ({
  modalMenuVisible,
  onHandleMenuModal,
  categories,
  onSearchCategoryQuery,
  searchCategoryQuery,
}) => {
  return (
    <Modal animationType="fade" visible={modalMenuVisible}>
      <View style={styles.container}>
        <SearchInput
          onHandleViewScreen={onHandleMenuModal}
          query={searchCategoryQuery}
          onSearchQuery={onSearchCategoryQuery}
        />
        {categories.length === 0 ? (
          <View style={styles.notFoundView}>
            <Icon name="help" size={120} color={colorCollection.darkviolet} />
            <Text style={styles.notFoundText}>
              Please, search for your favourite product
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.categoryList}
            data={categories}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item, index }) => {
              const lastItem = index === categories.length - 1;
              return (
                <CategoryCard
                  item={item}
                  lastItem={lastItem}
                  onHandleMenuModal={onHandleMenuModal}
                />
              );
            }}
            keyExtractor={(item) => item}
          />
        )}
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
    backgroundColor: colorCollection.lightviolet,
  },
  categoryList: {
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
