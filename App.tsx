import React from "react";
import { ExpoRoot } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

// Entrada principal de la app: registra las rutas leyendo la carpeta app/
export default function App() {
  // Cargamos las fuentes de los iconos para evitar glyphs faltantes
  const [fontsLoaded] = useFonts({ ...Ionicons.font });

  // Le digo a Expo Router dónde buscar las pantallas
  const ctx = (
    require as unknown as {
      context: (path: string, recursive?: boolean, regExp?: RegExp) => unknown;
    }
  ).context("./app");

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <ExpoRoot context={ctx} />;
}
