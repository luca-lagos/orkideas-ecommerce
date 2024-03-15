import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./NavBar";
import products from "../utils/data/products.json";
import promotions from "../utils/data/promotions.json";
import { useGetAllProductsQuery } from "../app/services/shopService";
import { useGetAllPromotionsQuery } from "../app/services/shopService";
import { useGetAllCategoriesQuery } from "../app/services/shopService";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/shop/Home";
import ProductByCategory from "../views/shop/ProductByCategory";
import ProductDetail from "../views/shop/ProductDetail";
import Cart from "../views/cart/Cart";
import Orders from "../views/user/Orders";
import Account from "../views/user/Account";
import Favs from "../views/user/Favs";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { data: productsRD } = useGetAllProductsQuery();
  const { data: categoriesRD } = useGetAllCategoriesQuery();

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <NavBar categories={categoriesRD} products={productsRD} />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="ProductByCategory"
              component={ProductByCategory}
              initialParams={{ products: productsRD, onSlider: false }}
            />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
          </Stack.Group>
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Favs" component={Favs} />
            <Stack.Screen name="Orders" component={Orders} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Group>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainNavigator;
