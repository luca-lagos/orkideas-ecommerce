import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Header from "./src/components/Header";
import Menu from "./src/components/modal/Menu";
import Search from "./src/components/modal/Search";
import categories from "./src/utils/data/categories.json";

export default function App() {
  const [modalSearchVisible, setSearchModalVisible] = useState(false);
  const [modalMenuVisible, setMenuModalVisible] = useState(false);

  const onHandleSearchModal = (value) => {
    setSearchModalVisible(value);
  };

  const onHandleMenuModal = (value) => {
    setMenuModalVisible(value);
  };

  return (
    <View style={styles.container}>
      <Header onHandleMenuModal={onHandleMenuModal} />
      <Menu
        modalMenuVisible={modalMenuVisible}
        onHandleMenuModal={onHandleMenuModal}
        categories={categories}
      />
      <Search
        modalSearchVisible={modalSearchVisible}
        onHandleSearchModal={onHandleSearchModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
