import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./NavBar";
import products from "../utils/data/products.json";
import promotions from "../utils/data/promotions.json";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/shop/Home";
import ProductByCategory from "../views/shop/ProductByCategory";
import ProductDetail from "../views/shop/ProductDetail";
import Cart from "../views/cart/Cart";
const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <NavBar />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              initialParams={{
                products: products,
                promotions: promotions,
                onSlider: true,
              }}
            />
            <Stack.Screen
              name="ProductByCategory"
              component={ProductByCategory}
              initialParams={{ products: products, onSlider: false }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              initialParams={{ products: products }}
            />
          </Stack.Group>
          <Stack.Screen name="Cart" component={Cart} />
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
