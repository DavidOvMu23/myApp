import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface TextButtonProps {
  text: string;
}

const TextButton = ({ text }: TextButtonProps) => {
  return (
    <TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4f46e5",
    marginBottom: 0,
  },
});

export default TextButton;
