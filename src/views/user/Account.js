import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../app/services/profileService";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import ButtonProfile from "../../components/profile/ButtonProfile";
import colorCollection from "../../utils/global/colors";

const Account = () => {
  const navigation = useNavigation();
  const localId = useSelector((state) => state.auth.localId);
  const { data: profile } = useGetProfileQuery(localId);
  console.log(profile);
  return (
    <View style={styles.container}>
      <View style={styles.account}>
        <View style={styles.profile}>
          <Image
            style={styles.userImage}
            src={profile.userImage}
            resizeMode="cover"
          />
          <Text style={styles.fullname}>
            <strong>FULLNAME: </strong>
            {profile.fullname}
          </Text>
          <Text style={styles.location}>
            <strong>LOCATION: </strong>
            {profile.location}
          </Text>
          <ButtonProfile />
        </View>
        <Pressable style={styles.editAccountButton}>
          <Icon name="draft-orders" size={35} color={colorCollection.violet} />
        </Pressable>
      </View>
      <Pressable
        style={styles.modalButton}
        onPress={() => {
          navigation.navigate("Orders");
        }}
      >
        <Text style={styles.modalButtonText}>My orders</Text>
        <Icon name="" size={35} color={colorCollection.darkviolet} />
      </Pressable>
      <Pressable
        style={styles.modalButton}
        onPress={() => {
          navigation.navigate("Favs");
        }}
      >
        <Text style={styles.modalButtonText}>My favs</Text>
        <Icon name="" size={35} color={colorCollection.darkviolet} />
      </Pressable>
    </View>
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
});
