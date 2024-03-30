import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import colorCollection from "../../utils/global/colors";
import fonts from "../../utils/global/fonts";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Notification = ({
  title,
  navigate,
  modalVisible,
  onSuccess,
  onError,
  onInfo,
}) => {
  const navigation = useNavigation();

  return (
    <Modal animationType="fade" visible={modalVisible}>
      <View style={styles.container}>
        <Pressable
          style={styles.closeModalButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="close" color={colorCollection.textlight} size={35} />
        </Pressable>
        <View style={styles.modalMessageContainer}>
          <Icon
            name={onSuccess ? "check-circle" : onError ? "error" : "info"}
            color={onSuccess ? colorCollection.green : colorCollection.red}
            backgroundColor={"white"}
            borderRadius={100}
            size={150}
          />
          <Text style={styles.modalMessageTitle}>{title}</Text>
        </View>
        <Pressable
          style={[
            styles.navigateButton,
            {
              backgroundColor: onSuccess
                ? colorCollection.green
                : onError
                ? colorCollection.red
                : colorCollection.violet,
              display: navigate != null ? "flex" : "none",
            },
          ]}
          onPress={() => {
            if (onSuccess) {
              navigation.navigate(navigate);
            } else {
              navigation.goBack();
            }
          }}
        >
          {onSuccess ? (
            <Text style={styles.navigateTitle}>go to {navigate}</Text>
          ) : (
            <Text style={styles.navigateTitle}>go back</Text>
          )}
        </Pressable>
      </View>
    </Modal>
  );
};

export default Notification;

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
    gap: 15,
  },
  modalMessageTitle: {
    fontSize: 22,
    maxWidth: 200,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
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
