// No conseguia hacer el bottom bar como quería y me parecía una completa fumada
// y no consegua haerlo por que era algo demasiado avanzado, entonces le pedí ayuda al chatGPT
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, type Href } from "expo-router";
import { useThemePreference } from "src/providers/ThemeProvider";

// Definimos el tipo de cada elemento de la barra inferior
export type BottomNavItem = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress?: () => void;
  active?: boolean;
  href?: Href;
};

// Componente de barra de navegación inferior con pestañas y botón flotante
interface Props {
  items: BottomNavItem[];
  fabIcon?: React.ComponentProps<typeof Ionicons>["name"];
  onFabPress?: () => void;
  showFab?: boolean;
}
// Componente funcional que representa la barra de navegación inferior
export default function BottomNav({
  items,
  fabIcon = "add",
  onFabPress,
  showFab = true,
}: Props) {
  const { colors, isDark } = useThemePreference();
  // Colores de tabs: activo con contraste, inactivo suavizado para que destaque el seleccionado
  const activeColor = isDark ? "#ffffff" : "#0f172a";
  const inactiveColor = isDark
    ? "rgba(255,255,255,0.58)"
    : "rgba(15,23,42,0.6)";

  return (
    <>
      {/* Mostramos el botón flotante si lo necesitamos*/}
      {showFab && (
        <View style={styles.fabContainer}>
          <TouchableOpacity
            style={[
              styles.fab,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            onPress={onFabPress}
          >
            <Ionicons name={fabIcon} size={26} color={colors.text} />
          </TouchableOpacity>
        </View>
      )}

      {/* Pintamos la barra inferior con las pestañas */}
      <View
        style={[
          styles.tabBar,
          { backgroundColor: colors.primary, borderColor: colors.border },
        ]}
      >
        {items.map((item) => {
          // Cambiamos el color si la pestaña está activa
          const color = item.active ? activeColor : inactiveColor;
          const content = (
            <View style={styles.tabItem}>
              <Ionicons name={item.icon} size={24} color={color} />
              <Text style={[styles.tabLabel, { color }]}>{item.label}</Text>
            </View>
          );

          // Usamos Link si nos pasan href
          if (item.href) {
            return (
              <Link key={item.label} href={item.href} asChild>
                <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }}>
                  {content}
                </TouchableOpacity>
              </Link>
            );
          }

          // Usamos onPress manual si no hay href
          return (
            <TouchableOpacity
              key={item.label}
              onPress={item.onPress}
              activeOpacity={0.7}
              style={{ flex: 1 }}
            >
              {content}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingBottom: 12,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
  },
  fabContainer: {
    position: "absolute",
    right: 18,
    bottom: 98,
    zIndex: 5,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
});
