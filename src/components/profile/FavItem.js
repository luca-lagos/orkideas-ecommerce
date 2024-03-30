import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import colorCollection from "../../utils/global/colors";
import fonts from "../../utils/global/fonts";
import { useDeleteFavMutation } from "../../app/services/profileService";

const FavItem = ({ item, localId }) => {
  const [triggerDelFav] = useDeleteFavMutation();
  console.log(item.id);

  const onDeleteFav = async () => {
    await triggerDelFav({ localId: localId, productId: item.id })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} src={item.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
      <Pressable onPress={onDeleteFav} style={styles.deleteFavItem}>
        <Icon name="delete" color={colorCollection.red} size={40} />
      </Pressable>
    </View>
  );
};

export default FavItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 6,
    padding: 12,
    borderRadius: 10,
    elevation: 5,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "auto",
    marginLeft: 10,
    marginRight: 10,
    gap: 25,
  },
  image: {
    borderRadius: 10,
    width: "25%",
    height: "100%",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 75,
    width: "50%",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: colorCollection.darkviolet,
    fontFamily: fonts.Josefin,
    width: 180,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginTop: 10,
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    color: colorCollection.textdark,
    fontFamily: fonts.Josefin,
  },
});
