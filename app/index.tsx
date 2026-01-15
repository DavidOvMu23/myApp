import React from "react";
import { Redirect } from "expo-router";

// Pantalla inicial: redirige al login nada más cargar la app
export default function Index() {
  return <Redirect href="/login" />; // No muestra UI, solo cambia de ruta
}
