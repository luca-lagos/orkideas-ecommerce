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
import { fetchSession } from "../utils/db";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import EditAccount from "../views/user/EditAccount";
import Recovery from "../views/auth/Recovery";

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { data: productsRD } = useGetAllProductsQuery();
  const { data: categoriesRD } = useGetAllCategoriesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const session = await fetchSession();
      if (session.rows.length) {
        const now = Math.floor(Date.now() / 1000);
        const updateAt = session.rows._array[0].updateAt;
        const sessionTime = now - updateAt;
        if (sessionTime < 3600) {
          const user = session.rows._array[0];
          dispatch(setUser(user));
        }
      }
    })();
  }, []);

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
            <Stack.Screen name="EditAccount" component={EditAccount}/>
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Recovery" component={Recovery}/>
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
