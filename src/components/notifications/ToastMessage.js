import { StyleSheet, Animated, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const ToastMessage = ({title, onSuccess, onWarning, onInfo, onError}) => {
  return (
    <Animated.View>
      <View>
        <Text>{}</Text>
      </View>
    </Animated.View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({});
