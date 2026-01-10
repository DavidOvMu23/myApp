import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface TextfieldPasswordProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const TextfieldPassword = ({
  value,
  onChangeText,
}: TextfieldPasswordProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Contraseña"
        secureTextEntry
        autoCapitalize="none"
        activeOutlineColor="#4f46e5"
        outlineColor="#D0D0D0"
        left={<TextInput.Icon icon="lock-outline" color="#888888" />}
        style={styles.input}
        outlineStyle={styles.outline}
        value={value}
        onChangeText={onChangeText}
        theme={{
          colors: {
            text: "#000",
            placeholder: "#999",
            onSurfaceVariant: "#999",
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FAFAFA",
    fontSize: 15,
  },
  outline: {
    borderRadius: 12,
  },
});

export default TextfieldPassword;
