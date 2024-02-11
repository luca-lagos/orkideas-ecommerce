import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import Header from "./src/components/Header";
import Menu from "./src/views/modal/Menu";
import Search from "./src/views/modal/Search";
import categories from "./src/utils/data/categories.json";
import products from "./src/utils/data/products.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/views/Home";
import ProductByCategory from "./src/views/ProductByCategory";
import ProductDetail from "./src/views/ProductDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  const [modalSearchVisible, setSearchModalVisible] = useState(false);
  const [modalMenuVisible, setMenuModalVisible] = useState(false);
  const [searchProductQuery, setSearchProductQuery] = useState("");
  const [searchCategoryQuery, setSearchCategoryQuery] = useState("");
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState(categories);

  const onHandleSearchModal = (value) => {
    setSearchModalVisible(value);
  };

  const onHandleMenuModal = (value) => {
    setMenuModalVisible(value);
  };

  const onSearchProductQuery = (e) => {
    if (e) {
      const newData = products.filter((item) => {
        const itemData =
          item.title || item.brand || item.category
            ? item.title.toLowerCase() ||
              item.brand.toLowerCase() ||
              item.category.toLowerCase()
            : "".toLowerCase();
        const searchProductData = e.toLowerCase();
        return itemData.indexOf(searchProductData) > -1;
      });
      setFilteredProductList(newData);
      setSearchProductQuery(e);
    } else {
      setFilteredProductList([]);
      setSearchProductQuery(e);
    }
  };

  const onSearchCategoryQuery = (e) => {
    if (e) {
      const newData = categories.filter((item) => {
        const itemData = item ? item.toLowerCase() : "".toLowerCase();
        const searchCategoryData = e.toLowerCase();
        return itemData.indexOf(searchCategoryData) > -1;
      });
      setFilteredCategoryList(newData);
      setSearchCategoryQuery(e);
    } else {
      setFilteredCategoryList(categories);
      setSearchCategoryQuery(e);
    }
  };

  return (
    <NavigationContainer style={styles.container}>
      <Header
        onHandleMenuModal={onHandleMenuModal}
        onHandleSearchModal={onHandleSearchModal}
      />
      <Menu
        modalMenuVisible={modalMenuVisible}
        onHandleMenuModal={onHandleMenuModal}
        categories={filteredCategoryList}
        searchCategoryQuery={searchCategoryQuery}
        onSearchCategoryQuery={onSearchCategoryQuery}
      />
      <Search
        modalSearchVisible={modalSearchVisible}
        onHandleSearchModal={onHandleSearchModal}
        products={filteredProductList}
        searchProductQuery={searchProductQuery}
        onSearchProductQuery={onSearchProductQuery}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ProductByCategory"
          component={ProductByCategory}
          initialParams={{ products: products }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          initialParams={{ products: products }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
