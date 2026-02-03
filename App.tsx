import React from "react";
import { ExpoRoot } from "expo-router";

// Entrada principal de la app: registra las rutas leyendo la carpeta app/
export default function App() {
  // Le digo a Expo Router dónde buscar las pantallas
  const ctx = (
    require as unknown as {
      context: (path: string, recursive?: boolean, regExp?: RegExp) => unknown;
    }
  ).context("./app");
  return <ExpoRoot context={ctx} />;
}
