import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import colors from "../constants/colors";
import ConditionalRendering from "../components/ConditionalRendering";

export default function Alert(props) {
  const {
    alertContainerStyles,
    withImage,
    imageStyles,
    title,
    alertTitleStyles,
    alertDescriptionContainerStyles,
    description,
    alertDescriptionStyles,
    alertActionContainerStyles,
    isLoading,
    alertActionTextStyles,
    onPressAction,
    onClose,
    alertTitle,
    activityIndicatorProps,
  } = props;
  return (
    <View style={[styles.container, alertContainerStyles]}>
      <TouchableOpacity onPress={onClose} style={styles.closeTouchable}>
        <Image
          style={styles.closeIcon}
          source={require("../assets/close.png")}
        />
      </TouchableOpacity>
      <ConditionalRendering
        condition={withImage}
        positive={
          <Image style={[styles.alertImage, imageStyles]} source={withImage} />
        }
        negative={null}
      />
      <Text style={[styles.alertTitle, alertTitleStyles]}>{title}</Text>
      <View
        style={[
          styles.alertDescriptionContainer,
          alertDescriptionContainerStyles,
        ]}
      >
        {description &&
          Array.isArray(description) &&
          description?.map((desc, index) => {
            return (
              <Text
                key={`${desc}_${index}`}
                style={[styles.alertDescription, alertDescriptionStyles]}
              >
                {desc}
              </Text>
            );
          })}
      </View>
      <TouchableOpacity
        style={[styles.alertActionContainer, alertActionContainerStyles]}
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
            <Text style={[styles.alertActionText, alertActionTextStyles]}>
              {alertTitle}
            </Text>
          }
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  alertTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  alertDescriptionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9,
  },
  alertDescription: {
    color: colors.textGray,
    fontWeight: "500",
    textAlign: "center",
  },
  alertActionContainer: {
    backgroundColor: colors.darkRed,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 200,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  alertActionText: {
    color: colors.white,
    fontWeight: "600",
  },
  alertImage: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginBottom: 24,
  },
  closeIcon: {
    height: 24,
    width: 24,
  },
  closeTouchable: {
    alignSelf: "flex-end",
  },
});
