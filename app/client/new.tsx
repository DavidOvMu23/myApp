import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Header from "src/components/Header/header";
import CustomButton from "src/components/Buttons/button";
import BottomNav, {
  type BottomNavItem,
} from "src/components/BottomNav/bottom_nav";

export default function NewClient() {
  const router = useRouter();

  // Pestañas inferiores; seguimos marcando Clientes como activo
  const navItems: BottomNavItem[] = [
    {
      icon: "home-outline",
      label: "Home",
      onPress: () => router.push("/home"),
      href: "/home",
    },
    { icon: "document-text-outline", label: "Pedidos" },
    {
      icon: "people-outline",
      label: "Clientes",
      onPress: () => router.push("/client"),
      href: "/client",
      active: true,
    },
    { icon: "cube-outline", label: "Inventario" },
  ];

  return (
    <View style={styles.container}>
      <Header name="Nuevo cliente" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Crear cliente</Text>
        <Text style={styles.subtitle}>
          Aquí puedes añadir los datos básicos del cliente. (Formulario
          pendiente)
        </Text>
        <View style={{ height: 24 }} />
        {/* Botones placeholder; volver atrás en ambos casos */}
        <CustomButton text="Guardar" onPress={() => router.back()} />
        <View style={{ height: 12 }} />
        <CustomButton text="Cancelar" onPress={() => router.back()} />
      </ScrollView>
      <BottomNav items={navItems} showFab={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7fb",
  },
  content: {
    padding: 16,
    paddingBottom: 120,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
  },
});
