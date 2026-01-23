import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "src/components/Header/header";
import CustomButton from "src/components/Buttons/button";
import BottomNav from "src/components/BottomNav/bottom_nav";
import { TextInput } from "react-native-paper";
import useNewClient from "src/hooks/useNewClient";
import { useThemePreference } from "src/providers/ThemeProvider";

export default function NewClient() {
  // Obtenemos estado, validaciones y navegación desde el hook
  const {
    nombre,
    email,
    telefono,
    nif,
    isSaveDisabled,
    navItems,
    setNombre,
    setEmail,
    setTelefono,
    setNif,
    handleSave,
    handleCancel,
    textInputProps,
    isAdmin,
    iconColor,
  } = useNewClient();
  const { colors } = useThemePreference();

  // Si no es admin, mostramos mensaje de restricción
  if (!isAdmin) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header name="Nuevo cliente" />
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Solo los administradores pueden crear clientes.
          </Text>
          <View style={{ height: 12 }} />
          {/* Volvemos a la pantalla anterior usando el handler del hook */}
          <CustomButton text="Volver" onPress={handleCancel} />
        </View>
      </View>
    );
  }

  // Renderizamos el formulario de creación de nuevo cliente
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header name="Nuevo cliente" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Crear cliente
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Añade los datos básicos y guarda para crear el cliente.
        </Text>

        {/* Escribimos el nombre y lo guardamos en `nombre` */}
        <TextInput
          mode="outlined"
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          // textInputProps agrupa estilos base y colores según el tema
          style={textInputProps.style}
          outlineStyle={textInputProps.outlineStyle}
          outlineColor={textInputProps.outlineColor}
          activeOutlineColor={textInputProps.activeOutlineColor}
          textColor={textInputProps.textColor}
          placeholderTextColor={textInputProps.placeholderTextColor}
          selectionColor={textInputProps.selectionColor}
          left={<TextInput.Icon icon="account-outline" color={iconColor} />}
        />

        {/* Escribimos el email y lo guardamos en `email` */}
        <TextInput
          mode="outlined"
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={textInputProps.style}
          outlineStyle={textInputProps.outlineStyle}
          outlineColor={textInputProps.outlineColor}
          activeOutlineColor={textInputProps.activeOutlineColor}
          textColor={textInputProps.textColor}
          placeholderTextColor={textInputProps.placeholderTextColor}
          selectionColor={textInputProps.selectionColor}
          left={<TextInput.Icon icon="email-outline" color={iconColor} />}
        />

        {/* Escribimos el teléfono y lo guardamos en `telefono` */}
        <TextInput
          mode="outlined"
          label="Teléfono"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
          style={textInputProps.style}
          outlineStyle={textInputProps.outlineStyle}
          outlineColor={textInputProps.outlineColor}
          activeOutlineColor={textInputProps.activeOutlineColor}
          textColor={textInputProps.textColor}
          placeholderTextColor={textInputProps.placeholderTextColor}
          selectionColor={textInputProps.selectionColor}
          left={<TextInput.Icon icon="phone-outline" color={iconColor} />}
        />

        {/* Escribimos el NIF/CIF y lo guardamos en `nif` */}
        <TextInput
          mode="outlined"
          label="NIF/CIF"
          value={nif}
          onChangeText={setNif}
          style={textInputProps.style}
          outlineStyle={textInputProps.outlineStyle}
          outlineColor={textInputProps.outlineColor}
          activeOutlineColor={textInputProps.activeOutlineColor}
          textColor={textInputProps.textColor}
          placeholderTextColor={textInputProps.placeholderTextColor}
          selectionColor={textInputProps.selectionColor}
          left={
            <TextInput.Icon
              icon="card-account-details-outline"
              color={iconColor}
            />
          }
        />

        <View style={{ height: 16 }} />
        {/* Guardamos el nuevo cliente con los datos del formulario */}
        <CustomButton
          text="Guardar"
          disabled={isSaveDisabled}
          onPress={handleSave}
        />
        <View style={{ height: 12 }} />
        {/* Cancelamos y volvemos atrás */}
        <CustomButton text="Cancelar" onPress={handleCancel} />
      </ScrollView>
      <BottomNav items={navItems} showFab={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
  },
});
