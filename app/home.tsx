import React from "react"; // Necesario para JSX
import { View, Text, StyleSheet } from "react-native"; // Primitivas UI
import { useRouter } from "expo-router"; // Hook para navegar entre pantallas
import CustomButton from "src/components/Buttons/button"; // Botón primario reutilizable
import Header from "src/components/Header/header"; // Barra superior con saludo
import BottomNav, {
  type BottomNavItem,
} from "src/components/BottomNav/bottom_nav"; // Barra inferior de navegación

export default function Home() {
  const router = useRouter(); // Instancia de navegación para hacer push a rutas

  // Configuración de pestañas inferiores; marcamos Home como activa
  const navItems: BottomNavItem[] = [
    {
      icon: "home-outline",
      label: "Home",
      onPress: () => router.push("/home"),
      href: "/home",
      active: true,
    },
    { icon: "document-text-outline", label: "Pedidos" },
    {
      icon: "people-outline",
      label: "Clientes",
      onPress: () => router.push("/client"),
      href: "/client",
    },
    { icon: "cube-outline", label: "Inventario" },
  ];

  return (
    <View style={styles.container}>
      {/* Header con saludo y avatar que navega a login */}
      <Header
        name="Hola Usuario!"
        onAvatarPress={() => router.push("/login")}
      />

      {/* Zona central con CTA principal hacia clientes */}
      <View style={styles.content}>
        <CustomButton text="Clientes" onPress={() => router.push("/client")} />
        <Text style={styles.welcome}></Text>
      </View>

      {/* Barra inferior sin botón flotante */}
      <BottomNav items={navItems} showFab={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 120,
  },

  welcome: {
    fontSize: 16,
  },
});
