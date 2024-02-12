import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import colorCollection from "../utils/global/colors";
import fonts from "../utils/global/fonts";

const SearchInput = ({ onHandleViewScreen, query, onSearchQuery }) => {
  return (
    <View style={styles.searchBar}>
      <Pressable
        style={styles.searchButton}
        onPress={() => {
          onHandleViewScreen(false);
        }}
      >
        <Icon name="close" size={25} color={colorCollection.textlight} />
      </Pressable>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={query}
        onChangeText={onSearchQuery}
        clear
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: colorCollection.darkviolet,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorCollection.textdark,
  },
  searchInput: {
    width: "83%",
    backgroundColor: colorCollection.textlight,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
    fontFamily: fonts.Josefin,
  },
});
