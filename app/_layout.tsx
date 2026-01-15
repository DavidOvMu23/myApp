import React from "react"; // Habilita JSX y componentes
import { Stack } from "expo-router"; // Navegación basada en la carpeta app/

// Layout raíz: envuelve todas las rutas y oculta la cabecera nativa
export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />; // Stack gestiona las pantallas detectadas en app/
}
