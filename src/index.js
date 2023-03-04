import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import colors from "./constants/colors";
import Alert from "./ui/Alert";
import Confirmation from "./ui/Confirmation";
import Congratulations from "./ui/Congratulations";
import Loading from "./ui/Loading";

export default function UIModal(props) {
  const {
    isVisible,
    transparent,
    type,
    onClose,
    overlayColor,
    animationType,

    alertProps,

    confirmationProps,

    congProps,

    loadingProps,
  } = props;

  function getModalFromType() {
    if (type === "alert") {
      return <Alert {...alertProps} onClose={onClose} />;
    } else if (type === "confirmation") {
      return <Confirmation {...confirmationProps} onClose={onClose} />;
    } else if (type === "congratulations") {
      return <Congratulations {...congProps} onClose={onClose} />;
    } else if (type === "loading") {
      return <Loading {...loadingProps} onClose={onClose} />;
    } else if (type === "image") {
    }
    return <Alert {...alertProps} onClose={onClose} />;
  }

  const overlayContainer = {
    backgroundColor: overlayColor || colors.overlay,
  };

  const congratulationsContainer = {
    paddingHorizontal: type === "congratulations" ? 0 : 24,
  };
  return (
    <Modal
      onRequestClose={onClose}
      visible={isVisible}
      transparent={transparent === false ? false : true}
      animationType={animationType || "fade"}
    >
      <View
        style={[styles.container, congratulationsContainer, overlayContainer]}
      >
        {getModalFromType()}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
