import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Header from "src/components/Header/header";

type Props = {
  onNavigate?: (screen: "login" | "home" | "client") => void;
};

export default function Home({ onNavigate }: Props) {
  return (
    <View style={styles.header}>
      <Header name="Usuario" />

      <View style={styles.content}>
        <Button mode="contained" onPress={() => onNavigate?.("client")}>
          Clientes
        </Button>
        <Text style={styles.welcome}></Text>
      </View>
      <View style={styles.bottom_menu}>
        Aquí pondré el menú de abajo, de momento lo he hecho así
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
    backgroundColor: "#d6cd1fff",
  },
  bottom_menu: {
    backgroundColor: "#1fd637ff",
  },
  welcome: {
    fontSize: 16,
  },
});
