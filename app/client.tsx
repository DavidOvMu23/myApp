import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "src/components/Header/header";

export default function Client() {
  return (
    <View style={styles.container}>
      <Header name="Clientes" />
      <View style={styles.content}>
        <Text>Lista de clientes (vacío por ahora)</Text>
      </View>
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
