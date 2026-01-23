import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemePreference } from "src/providers/ThemeProvider";

// Componente de encabezado que muestra un saludo, la fecha actual y un avatar de usuario
interface Props {
  name?: string;
  onAvatarPress?: () => void;
  avatarUri?: string;
}

// Definimos el componente del header
// Envolvemos el header en SafeAreaView para evitar que la barra se corte en móviles con notch o barra de estado
export default function Header({
  name = "Usuario",
  onAvatarPress,
  avatarUri = "https://i.pravatar.cc/150?img=12", // la imagen me la dio el chatGPT
}: Props) {
  // Sacamos la fecha de hoy
  const today = new Date();
  // Traemos la paleta actual para que el header respete claro/oscuro
  const { colors } = useThemePreference();

  // Formateamos la fecha en español (esto me lo dio el chatGPT)
  const formatted = today.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.primary }]}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={[styles.greeting, { color: colors.contrastText }]}>
            {name}
          </Text>
          <Text style={[styles.date, { color: colors.contrastText }]}>
            {formatted}
          </Text>
        </View>
        {/* Dejamos el avatar como botón si pulsamos en él */}
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={onAvatarPress}
          activeOpacity={0.8}
        >
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    width: "100%",
  },
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginTop: 2,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
