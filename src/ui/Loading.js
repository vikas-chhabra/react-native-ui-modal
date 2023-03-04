import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../constants/colors";

export default function Loading(props) {
  const {
    loadingContainerStyles,
    title,
    titleStyles,
    description,
    descriptionStyles,
    activityIndicatorProps,
  } = props;
  return (
    <View style={[styles.container, loadingContainerStyles]}>
      <ActivityIndicator
        color={colors.blackText}
        size="large"
        {...activityIndicatorProps}
      />
      <Text style={[styles.loadingText, titleStyles]}>{title}</Text>
      <Text style={[styles.descriptionText, descriptionStyles]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    minHeight: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 9,
    color: colors.blackText,
  },
  descriptionText: {
    color: colors.textGray,
    marginTop: 3,
  },
});
