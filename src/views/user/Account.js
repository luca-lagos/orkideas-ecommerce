import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetFavsByIdQuery,
  useGetOrdersByIdQuery,
  useGetProfileQuery,
} from "../../app/services/profileService";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import colorCollection from "../../utils/global/colors";
import NavigationButtons from "../../components/navigation/NavigationButtons";
import fonts from "../../utils/global/fonts";
import WarningModal from "../modal/WarningModal";

const Account = () => {
  const route = useRoute();
  const user = useSelector((state) => state.auth);
  const localId = user.localId;/*route.params.localId*/;
  const navigation = useNavigation();
  const [logoutModal, setLogoutModal] = useState(false);
  const { data: profile } = useGetProfileQuery(localId);
  const { data: orderById } = useGetOrdersByIdQuery(localId);
  const { data: favById } = useGetFavsByIdQuery(localId);

  return (
    <>
      <View style={styles.container}>
        <NavigationButtons />
        <View style={styles.account}>
          <ImageBackground
            style={styles.userImage}
            source={{ uri: profile?.userImage }}
            resizeMode="cover"
            imageStyle={{
              borderColor: colorCollection.lightviolet,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: colorCollection.textdark,
              opacity: 0.8,
            }}
          >
            <View style={styles.userImageContainer}>
              <Text style={styles.userImageText}>MY PROFILE</Text>
            </View>
          </ImageBackground>
          <View style={styles.textContainer}>
            <Text style={styles.text}>FULLNAME: {profile?.fullname}</Text>
            <Text style={styles.text}>
              ADDRESS LOCATION: {profile?.location.address}
            </Text>
          </View>
          <Pressable
            style={styles.editAccountButton}
            onPress={() => {
              navigation.navigate("EditAccount", {
                localId: localId,
              });
            }}
          >
            <Icon name="edit" size={25} color={colorCollection.lightviolet} />
          </Pressable>
        </View>
        {orderById === true && (
          <Pressable
            style={styles.modalButton}
            onPress={() => {
              navigation.navigate("Orders");
            }}
          >
            <Text style={styles.modalButtonText}>My orders</Text>
            <Icon name="work" size={35} color={colorCollection.violet} />
          </Pressable>
        )}
        {favById === true && (
          <Pressable
            style={styles.modalButton}
            onPress={() => {
              navigation.navigate("Favs", {localId: localId});
            }}
          >
            <Text style={styles.modalButtonText}>My favs</Text>
            <Icon name="favorite" size={35} color={colorCollection.violet} />
          </Pressable>
        )}
        <Pressable
          style={styles.logoutContainer}
          onPress={() => {
            setLogoutModal(true);
          }}
        >
          <Text style={styles.logoutTitle}>LOGOUT</Text>
        </Pressable>
      </View>
      <WarningModal
        modalVisible={logoutModal}
        passModalVisible={setLogoutModal}
        isLogout={true}
        isDeleteFavs={false}
      />
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colorCollection.lightviolet,
  },
  account: {
    display: "flex",
    height: 260,
    flexDirection: "column",
    backgroundColor: "white",
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
  },
  userImage: {
    position: "absolute",
    top: 0,
    height: 150,
    width: "100%",
    marginBottom: 10,
  },
  userImageContainer: {
    padding: 15,
  },
  userImageText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colorCollection.textlight,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    gap: 5,
    marginTop: 150,
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    fontFamily: fonts.Josefin,
    color: colorCollection.darkviolet,
  },
  editAccountButton: {
    position: "absolute",
    right: 0,
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colorCollection.lightviolet,
    backgroundColor: colorCollection.darkviolet,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
  },
  modalButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colorCollection.violet,
  },
  logoutContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorCollection.red,
    height: 60,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
  },
  logoutTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colorCollection.white,
  },
});
