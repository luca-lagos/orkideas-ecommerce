import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { Icon } from "react-native-elements";
import Slider from "../../components/slider/Slider";
import NavigationButtons from "../../components/navigation/NavigationButtons";
import fonts from "../../utils/global/fonts";
import colorCollection from "../../utils/global/colors";
import AddCartItemButton from "../../components/shop/AddCartItemButton";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../../app/services/shopService";
import {
  usePostFavMutation,
  useDeleteFavMutation,
  useGetAllFavsQuery,
} from "../../app/services/profileService";
import { useSelector } from "react-redux";
import Notification from "../../components/notifications/Notification";

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const productId = route.params.productId - 1;
  const user = useSelector((state) => state.auth);
  const localId = user.localId;
  const { data: productByIdRD, isLoading } = useGetProductByIdQuery(productId);
  const [triggerAddFav] = usePostFavMutation();
  const { data: favs } = useGetAllFavsQuery(localId);
  const validateFav = favs?.find((e) => e?.id == productByIdRD?.id);
  const [notification, setNotification] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(null);
  const [navigate, setNavigate] = useState(null);

  console.log(validateFav);
  console.log(localId);

  const onHandleFav = async () => {
    if (localId !== undefined) {
      triggerAddFav({ localId: localId, product: productByIdRD });
      setNotification(true);
      setTitle("Product added to favorites");
      setSuccess(true);
      setError(false);
      setNavigate("Favs");
    } else {
      navigation.navigate("Login");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={colorCollection.violet}
          style={{ flex: 1 }}
        />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <NavigationButtons />
        <View style={styles.productContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{productByIdRD.title}</Text>
            {validateFav != undefined ? (
              <Icon name="favorite" size={35} color={colorCollection.red} />
            ) : (
              <Pressable onPress={onHandleFav}>
                <Icon
                  name="favorite"
                  size={35}
                  color={colorCollection.textdark}
                />
              </Pressable>
            )}
          </View>
          <Slider images={productByIdRD.images} categoryLink={false} />
          <AddCartItemButton initialValue={1} product={productByIdRD} />
        </View>
      </View>
      <Notification
        modalVisible={notification}
        title={title}
        navigate={navigate}
        onSuccess={success}
        onError={error}
      />
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorCollection.lightviolet,
  },
  loading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    margin: 15,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    fontFamily: fonts.Josefin,
    width: "80%",
  },
});
