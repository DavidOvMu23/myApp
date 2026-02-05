import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useThemePreference } from "src/providers/ThemeProvider";

//definimos las propiedades que puede recibir el botón
interface TextButtonProps {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
}

function TextButton({ text, onPress }: TextButtonProps) {
  const { colors } = useThemePreference();

  return (
    <TouchableOpacity onPress={onPress}>
      {/* Dejamos el texto con estilo tipo enlace para acciones secundarias */}
      <Text style={[styles.text, { color: colors.primary }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 0,
  },
});

export default TextButton;
