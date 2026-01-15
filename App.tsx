import React from "react"; // Necesario para JSX
import { ExpoRoot } from "expo-router"; // Orquesta la navegación basada en archivos

// Entrada principal de la app: registra las rutas leyendo la carpeta app/
export default function App() {
  const ctx = require.context("./app"); // Crea contexto con todas las rutas
  return <ExpoRoot context={ctx} />; // Renderiza router raíz
}
