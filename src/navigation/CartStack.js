import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../views/cart/Cart";

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Group
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Group>
  );
};

export default CartStack;
