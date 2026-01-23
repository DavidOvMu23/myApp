import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useThemePreference } from "src/providers/ThemeProvider";

//definimos las propiedades que puede recibir el botón
interface GoogleButtonProps {
  text?: string;
}

const GoogleButton = ({ text = "Continúa con Google" }: GoogleButtonProps) => {
  const { colors } = useThemePreference();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        // Fondo neutro y borde del tema para que el botón se integre en claro/oscuro
        { borderColor: colors.border, backgroundColor: colors.surface },
      ]}
    >
      {/* Ponemos el icono y el texto alineados */}
      <FontAwesome name="google" size={20} color="#EA4335" />
      <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    gap: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default GoogleButton;
