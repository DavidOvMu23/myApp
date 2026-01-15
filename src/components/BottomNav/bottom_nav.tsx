import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, type Href } from "expo-router";

export type BottomNavItem = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress?: () => void;
  active?: boolean;
  href?: Href;
};

interface Props {
  items: BottomNavItem[];
  fabIcon?: React.ComponentProps<typeof Ionicons>["name"];
  onFabPress?: () => void;
  showFab?: boolean;
}

export default function BottomNav({
  items,
  fabIcon = "add",
  onFabPress,
  showFab = true,
}: Props) {
  return (
    <>
      {/* Botón flotante opcional */}
      {showFab && (
        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab} onPress={onFabPress}>
            <Ionicons name={fabIcon} size={26} color="#111827" />
          </TouchableOpacity>
        </View>
      )}

      {/* Barra inferior con pestañas */}
      <View style={styles.tabBar}>
        {items.map((item) => {
          const color = item.active ? "#ffffffff" : "#8f8f8fff"; // Resalta activo
          const content = (
            <View style={styles.tabItem}>
              <Ionicons name={item.icon} size={24} color={color} />
              <Text style={[styles.tabLabel, { color }]}>{item.label}</Text>
            </View>
          );

          // Si hay href usamos Link (navegación declarativa)
          if (item.href) {
            return (
              <Link key={item.label} href={item.href} asChild>
                <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }}>
                  {content}
                </TouchableOpacity>
              </Link>
            );
          }

          // Si no, usamos onPress manual
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
    backgroundColor: "#231e8cff",
    borderTopWidth: 1,
    borderColor: "#ffffffff",
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
    color: "#111827",
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
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
});
