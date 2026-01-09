import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const LockIcon = () => {
  return (
    <View style={styles.container}>
      <Feather name="lock" size={24} color="#4f46e5" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E8EAF6",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LockIcon;
