import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface TextfieldEmailProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const TextfieldEmail = ({
  value,
  onChangeText,
}: TextfieldEmailProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        activeOutlineColor="#4f46e5"
        outlineColor="#D0D0D0"
        left={<TextInput.Icon icon="email-outline" color="#888888" />}
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

export default TextfieldEmail;
