import React from "react";
import { StyleSheet } from "react-native";
import TextField from "src/components/Inputs/TextField";

// Creamos un campo de texto para la contraseña
interface TextfieldPasswordProps {
  value: string;
  onChangeText: (text: string) => void;
}

// Wrapper específico para password usando el TextField genérico
export default function TextfieldPassword({
  value,
  onChangeText,
}: TextfieldPasswordProps) {
  return (
    <TextField
      value={value}
      onChangeText={onChangeText}
      placeholder="Contraseña"
      secure
      leftIcon="lock-outline"
    />
  );
}

// Estilos (compatibilidad, no usados por el wrapper genérico)
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    fontSize: 15,
  },
  outline: {
    borderRadius: 12,
  },
});
