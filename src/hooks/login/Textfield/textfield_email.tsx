import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useThemePreference } from "src/providers/ThemeProvider";

// Creamos un campo de texto para el email
interface TextfieldEmailProps {
  value: string;
  onChangeText: (text: string) => void;
}

import TextField from "src/components/Inputs/TextField";

// Wrapper específico usado en pantallas de login/registro
export function TextfieldEmail({ value, onChangeText }: TextfieldEmailProps) {
  return (
    <TextField
      value={value}
      onChangeText={onChangeText}
      placeholder="Email"
      keyboardType="email-address"
      leftIcon="email-outline"
    />
  );
}

// Definimos los estilos del input
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

export default TextfieldEmail;
