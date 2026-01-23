import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useThemePreference } from "src/providers/ThemeProvider";

/* el interface este es para definir las propiedades que el botón puede recibir */
interface ButtonProps {
  text: string;
  disabled?: boolean;
  onPress?: () => void;
}

/* Definimos el componente y recibimos los datos que nos pasan por props */
const Button = ({ text, disabled = false, onPress }: ButtonProps) => {
  const { colors, isDark } = useThemePreference();
  // Elegimos colores en función del tema y si está deshabilitado, evitando perder contraste
  const bg = disabled ? (isDark ? "#1f2937" : "#e5e7eb") : colors.primary;
  const fg = disabled ? (isDark ? "#94a3b8" : "#6b7280") : colors.contrastText;

  return (
    // Usamos TouchableOpacity para que se pueda pulsar
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bg }]}
      disabled={disabled}
      onPress={onPress}
    >
      {/* Ponemos el texto que llega desde el prop `text` */}
      <Text style={[styles.text, { color: fg }]}>{text}</Text>
    </TouchableOpacity>
  );
};

/* Definimos los estilos del botón */
const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Button;
