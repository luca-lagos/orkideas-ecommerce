import products from "../utils/data/products.json";
import promotions from "../utils/data/promotions.json";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/shop/Home";
import ProductByCategory from "../views/shop/ProductByCategory";
import ProductDetail from "../views/shop/ProductDetail";

const Stack = createNativeStackNavigator();

const ShopStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
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
      </Stack.Navigator>
    </>
  );
};

export default ShopStack;
