import React from "react"; // Habilita JSX
import { Redirect } from "expo-router"; // Componente de navegación inmediata

// Pantalla inicial: redirige al login nada más cargar la app
export default function Index() {
  return <Redirect href="/login" />; // No muestra UI, solo cambia de ruta
}
