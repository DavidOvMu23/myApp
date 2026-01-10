import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface Props {
  name?: string;
}

export default function Header({ name = "Usuario" }: Props) {
  const today = new Date();

  /* Lo de la fecha me lo ha hecho el chat*/
  const formatted = today.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.greeting}>Hola {name}!</Text>
        <Text style={styles.date}>{formatted}</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://cdn-3.expansion.mx/dims4/default/3ed2e74/2147483647/strip/true/crop/1000x1000+0+0/resize/1800x1800!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F98%2F48%2Fccf56493491f89ad68225c2fba92%2Fgeorge-floyd.jpg",
          }}
          style={styles.avatar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2563eb",
  },
  left: {
    flexDirection: "column",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
