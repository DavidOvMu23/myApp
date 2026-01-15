import React from "react";
import { ExpoRoot } from "expo-router";

// Entrada principal de la app: registra las rutas leyendo la carpeta app/
export default function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}
