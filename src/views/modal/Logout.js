import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import colorCollection from "../../utils/global/colors";
import fonts from "../../utils/global/fonts";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { deleteSession } from "../../utils/db";
import { clearUser } from "../../features/auth/authSlice";

const Logout = ({ modalVisible, passModalVisible }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(clearUser());
    deleteSession();
    navigation.navigate("Home");
  };

  return (
    <Modal animationType="fade" visible={modalVisible}>
      <View style={styles.container}>
        <Pressable
          style={styles.closeModalButton}
          onPress={() => {
            passModalVisible(false);
          }}
        >
          <Icon name="close" color={colorCollection.textlight} size={35} />
        </Pressable>
        <View style={styles.modalMessageContainer}>
          <Icon name={"warning"} color={"white"} size={150} />
          <Text style={styles.modalMessageTitle}>Are you sure to logout?</Text>
        </View>
        <View style={styles.navigateContainer}>
          <Pressable
            style={[
              styles.navigateButton,
              {
                backgroundColor: colorCollection.textdark,
              },
            ]}
            onPress={() => {
              passModalVisible(false);
            }}
          >
            <Text style={styles.navigateTitle}>cancel</Text>
          </Pressable>
          <Pressable
            style={[
              styles.navigateButton,
              { backgroundColor: colorCollection.red },
            ]}
            onPress={onLogout}
          >
            <Text style={styles.navigateTitle}>logout</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorCollection.lightviolet,
    gap: 25,
  },
  closeModalButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: colorCollection.textdark,
    borderRadius: 50,
  },
  modalMessageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    gap: 15,
    marginBottom: 10,
  },
  modalMessageTitle: {
    fontSize: 22,
    maxWidth: 200,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  navigateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  navigateButton: {
    width: 150,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  navigateTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
