import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "src/components/Header/header";

export default function Client() {
  return (
    <View style={styles.container}>
      <View style={styles.content}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
});
