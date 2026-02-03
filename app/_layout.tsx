import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "src/providers/AuthProvider";
import { ThemeProvider } from "src/providers/ThemeProvider";
import { QueryProvider } from "src/providers/QueryProvider";

// Envolvemos toda la aplicación con proveedores globales (tema + auth)
export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryProvider>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false, animation: "none" }} />
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
