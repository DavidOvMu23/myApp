import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native"; // Botón táctil, texto y tipos de evento

interface TextButtonProps {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const TextButton = ({ text, onPress }: TextButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* Parece un enlace: solo texto coloreado */}
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
