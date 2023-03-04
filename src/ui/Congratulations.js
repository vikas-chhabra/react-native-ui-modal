import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import ConditionalRendering from "../components/ConditionalRendering";
import Explosion from "../components/Explosion";
import colors from "../constants/colors";

export default function Congratulations(props) {
  const {
    onClose,
    congContainerStyles,
    backgroundColor,
    baseTextStyles,
    baseText,
    textContainerStyles,
    titles,
    descriptionContainerStyles,
    descriptionTextStyles,
    description,
    onPressAction,
    isLoading,
    actionButtonStyles,
    actionTextStyles,
    actionText,
    activityIndicatorProps
  } = props;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor || colors.warningCong },
        congContainerStyles,
      ]}
    >
      <Text style={[styles.baseText, baseTextStyles]}>{baseText}</Text>
      <View style={[styles.textContainer, textContainerStyles]}>
        {titles?.map((text, index) => {
          return (
            <Text key={`${text}_${index}`} style={styles.titleText}>
              {text}
            </Text>
          );
        })}
      </View>
      <View style={[styles.descriptionContainer, descriptionContainerStyles]}>
        <Text style={[styles.descriptionText, descriptionTextStyles]}>
          {description}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (!isLoading) {
            if (onPressAction) {
              onPressAction();
            } else {
              onClose();
            }
          }
        }}
        style={[styles.actionButton, actionButtonStyles]}
      >
        <ConditionalRendering
          condition={isLoading}
          positive={
            <ActivityIndicator
              color={colors.blackText}
              {...activityIndicatorProps}
            />
          }
          negative={
            <Text style={[styles.actionText, actionTextStyles]}>
              {actionText}
            </Text>
          }
        />
      </TouchableOpacity>
      <Explosion count={200} origin={{ x: 0, y: 0 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warningCong,
    justifyContent: "center",
    alignItems: "center",
  },
  baseText: {
    color: colors.white,
    fontWeight: "bold",
    letterSpacing: 1.4,
  },
  textContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  titleText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 2,
  },
  descriptionContainer: {
    marginTop: 24,
    paddingHorizontal: 48,
    alignItems: "center",
  },
  descriptionText: {
    color: colors.white,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.8,
  },
  actionButton: {
    backgroundColor: colors.white,
    width: "90%",
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 48,
  },
  actionText: {
    fontWeight: "bold",
    color: colors.blackText,
  },
});
