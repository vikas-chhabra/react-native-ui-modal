import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

export default function Warning(props) {
  const {description} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>⚠️ Warning</Text>
      <Text style={styles.warningDescription}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: colors.warningBg,
    paddingVertical: 12,
    borderRadius: 9,
    marginTop: 9,
    paddingHorizontal: 12,
  },
  warningText: {
    fontWeight: "bold",
    color: colors.warningText,
  },
  warningDescription: {
    fontSize: 13,
    color: colors.warningText,
    marginTop: 6
  },
});
