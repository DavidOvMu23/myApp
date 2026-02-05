import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useThemePreference } from "src/providers/ThemeProvider";

interface TextFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secure?: boolean;
  keyboardType?: React.ComponentProps<typeof TextInput>["keyboardType"];
  leftIcon?: string | null;
}

export default function TextField({
  value,
  onChangeText,
  placeholder = "",
  secure = false,
  keyboardType,
  leftIcon = null,
}: TextFieldProps) {
  const { colors, isDark } = useThemePreference();
  const fieldBackground = isDark ? "#111b2a" : "#f8fafc";
  const placeholderColor = isDark ? "rgba(179,192,207,0.72)" : "#9ca3af";

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder={placeholder}
        secureTextEntry={secure}
        autoCapitalize={secure ? "none" : "words"}
        keyboardType={keyboardType}
        activeOutlineColor={colors.primary}
        outlineColor={colors.border}
        left={
          leftIcon ? (
            <TextInput.Icon icon={leftIcon as any} color={placeholderColor} />
          ) : undefined
        }
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
}

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
