import { StyleSheet, View } from "react-native";
import React from "react";
import colorCollection from "../../utils/global/colors";
import NavigationButtons from "../../components/navigation/NavigationButtons";
import UserForm from "../../components/auth/UserForm";
import { useRoute } from "@react-navigation/native";
import { useGetProfileQuery } from "../../app/services/profileService";

const EditAccount = () => {
  const route = useRoute();
  const localId = route.params.localId;
  const {data: profile } = useGetProfileQuery(localId);
  console.log(profile);
  return (
    <>
      <View style={styles.container}>
        <NavigationButtons />
        <UserForm
          onRegister={false}
          onUpdate={true}
          profile={profile}
          localId={localId}
        />
      </View>
    </>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colorCollection.lightviolet,
  },
});
