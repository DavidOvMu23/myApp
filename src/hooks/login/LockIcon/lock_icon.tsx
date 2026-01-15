import React from "react"; // JSX
import { View, StyleSheet, Text } from "react-native"; // UI base
import { Feather } from "@expo/vector-icons"; // Icono de candado

// Componente funcional que representa un ícono de candado
const LockIcon = () => {
  return (
    <View style={styles.container}>
      {/* Ícono centrado en círculo lila claro */}
      <Feather name="lock" size={24} color="#4f46e5" />
    </View>
  );
};

// Estilos para el componente LockIcon
const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E8EAF6",
    justifyContent: "center",
    alignItems: "center",
  },
});

// Exporta el componente LockIcon como el valor predeterminado del módulo
export default LockIcon;
