import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ShopStack from "./ShopStack";
import NavBar from "./NavBar";

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <NavBar />
        <ShopStack />
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
