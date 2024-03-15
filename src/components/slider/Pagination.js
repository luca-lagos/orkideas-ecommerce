import { StyleSheet, Animated, View, Dimensions } from "react-native";
import colorCollection from "../../utils/global/colors";
import React from "react";

const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX }) => {
  return (
    <View style={styles.container}>
      {data?.map((item, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const doWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });

        const doBackgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            colorCollection.textlight,
            colorCollection.violet,
            colorCollection.textlight,
          ],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={idx}
            style={[
              styles.dot,
              {
                width: doWidth,
                backgroundColor: doBackgroundColor,
              },
            ]}
          ></Animated.View>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
});
