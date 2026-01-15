import React from "react"; // JSX
import { View, Text, StyleSheet, ScrollView } from "react-native"; // UI base
import { useRouter } from "expo-router"; // Navegación
import Header from "src/components/Header/header"; // Barra superior
import CustomButton from "src/components/Buttons/button"; // Botón reutilizable
import { clientes } from "src/types"; // Datos mock de clientes
import BottomNav, {
  type BottomNavItem,
} from "src/components/BottomNav/bottom_nav"; // Barra inferior

// Lista de clientes con navegación a detalle y creación
export default function Client() {
  const router = useRouter(); // Hook de navegación

  // Pestañas inferiores; Clientes activo
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
      <Header name="Clientes" />

      {/* Lista de botones, uno por cliente */}
      <ScrollView contentContainerStyle={styles.list}>
        {clientes.map((c) => (
          <View key={c.id}>
            <CustomButton
              text={c.nombre}
              onPress={() => router.push(`/client/${c.id}`)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Barra inferior con FAB para crear cliente */}
      <BottomNav
        items={navItems}
        showFab
        onFabPress={() => router.push("/client/new")}
      />
    </View>
  );
}

// Estilos para el componente Client
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    padding: 16,
  },
});
