import React from "react";
import { Stack } from "expo-router";

// envuelve todas las rutas y oculta la cabecera nativa
export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />; // Stack gestiona las pantallas detectadas en app/
}
