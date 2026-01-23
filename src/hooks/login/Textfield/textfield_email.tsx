import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useThemePreference } from "src/providers/ThemeProvider";

// Creamos un campo de texto para el email
interface TextfieldEmailProps {
  value: string;
  onChangeText: (text: string) => void;
}

// Definimos el componente que pinta el input de email
export const TextfieldEmail = ({
  value,
  onChangeText,
}: TextfieldEmailProps) => {
  const { colors, isDark } = useThemePreference();
  // Ajustamos fondo/placeholder para que se lea bien en ambos temas
  const fieldBackground = isDark ? "#111b2a" : "#f8fafc";
  const placeholderColor = isDark ? "rgba(179,192,207,0.72)" : "#9ca3af";

  return (
    <View style={styles.container}>
      {/* Usamos value y onChangeText que llegan desde la pantalla */}
      <TextInput
        mode="outlined"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        activeOutlineColor={colors.primary}
        outlineColor={colors.border}
        left={<TextInput.Icon icon="email-outline" color={placeholderColor} />}
        style={[styles.input, { backgroundColor: fieldBackground }]}
        outlineStyle={styles.outline}
        value={value}
        onChangeText={onChangeText}
        theme={{
          colors: {
            text: colors.text,
            placeholder: placeholderColor,
            onSurfaceVariant: placeholderColor,
          },
        }}
      />
    </View>
  );
};

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
