import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useThemePreference } from "src/providers/ThemeProvider";

// Pintamos un ícono de candado dentro de un círculo
const LockIcon = () => {
  const { colors, isDark } = useThemePreference();
  // Fondo suave usando surface y un velo claro para que no grite en oscuro
  const background = isDark ? "rgba(255,255,255,0.06)" : "#f3f0f6";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: background, borderColor: colors.border },
      ]}
    >
      {/* Dejamos el ícono centrado para que se vea limpio */}
      <Feather name="lock" size={24} color={colors.primary} />
    </View>
  );
};

// Definimos los estilos del icono
const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// Exportamos el componente para usarlo en otras pantallas
export default LockIcon;
