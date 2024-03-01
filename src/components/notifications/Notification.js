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
}) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      style={styles.container}
    >
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
          name={onSuccess ? "check-circle" : "error"}
          color={onSuccess ? colorCollection.green : colorCollection.red}
          size={35}
        />
        <Text style={styles.modalMessageTitle}>{title}</Text>
      </View>
      <Pressable
        style={[
          styles.navigateButton,
          {
            backgroundColor: onSuccess
              ? colorCollection.green
              : colorCollection.red,
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
  },
  closeModalButton: {
  },
  modalMessageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalMessageTitle: {},
  navigateButton: {},
  navigateTitle: {},
});
