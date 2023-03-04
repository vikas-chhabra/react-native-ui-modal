import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import ConditionalRendering from "../components/ConditionalRendering";
import Warning from "../components/Warning";
import colors from "../constants/colors";

export default function Confirmation(props) {
  const {
    title,
    titleTextStyles,
    confirmationDescriptionContainerStyles,
    description,
    confirmationDescriptionStyles,
    withWarning,
    onClose,
    isLoading,
    onPressAction,
    confirmationActionTextStyles,
    confirmationTitle,
    confirmationActionContainerStyles,
    actionContainerStyles,
    confirmationCancelTitle,
    confirmationCancelContainerStyles,
    activityIndicatorProps,
    confirmationContainerStyles
  } = props;
  return (
    <View style={[styles.container, confirmationContainerStyles]}>
      <TouchableOpacity onPress={onClose} style={styles.closeTouchable}>
        <Image
          style={styles.closeIcon}
          source={require("../assets/close.png")}
        />
      </TouchableOpacity>
      <Text style={[styles.titleText, titleTextStyles]}>{title}</Text>
      <View
        style={[
          styles.confirmationDescriptionContainer,
          confirmationDescriptionContainerStyles,
        ]}
      >
        {description &&
          Array.isArray(description) &&
          description?.map((desc, index) => {
            return (
              <Text
                key={`${desc}_${index}`}
                style={[
                  styles.confirmationDescription,
                  confirmationDescriptionStyles,
                ]}
              >
                {desc}
              </Text>
            );
          })}
      </View>

      <ConditionalRendering
        condition={withWarning}
        positive={<Warning {...withWarning} />}
        negative={null}
      />

      <View style={[styles.actionContainer, actionContainerStyles]}>
        <TouchableOpacity
          style={[
            styles.confirmationCancelContainer,
            confirmationCancelContainerStyles,
          ]}
          onPress={() => {
            onClose();
          }}
        >
          <Text
            style={[
              styles.confirmationActionText,
              confirmationActionTextStyles,
            ]}
          >
            {confirmationCancelTitle || "Cancel"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.confirmationActionContainer,
            confirmationActionContainerStyles,
          ]}
          onPress={() => {
            if (!isLoading) {
              if (onPressAction) {
                onPressAction();
              } else {
                onClose();
              }
            }
          }}
        >
          <ConditionalRendering
            condition={isLoading}
            positive={
              <ActivityIndicator
                color={colors.white}
                {...activityIndicatorProps}
              />
            }
            negative={
              <Text
                style={[
                  styles.confirmationActionText,
                  confirmationActionTextStyles,
                ]}
              >
                {confirmationTitle}
              </Text>
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 24,
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmationDescriptionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9,
  },
  confirmationDescription: {
    color: colors.textGray,
    fontWeight: "500",
    textAlign: "center",
  },
  warningContainer: {},
  closeIcon: {
    height: 24,
    width: 24,
  },
  closeTouchable: {
    alignSelf: "flex-end",
  },
  confirmationActionContainer: {
    backgroundColor: colors.darkRed,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  confirmationCancelContainer: {
    backgroundColor: colors.textGray,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  confirmationActionText: {
    color: colors.white,
    fontWeight: "600",
  },
  actionContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
