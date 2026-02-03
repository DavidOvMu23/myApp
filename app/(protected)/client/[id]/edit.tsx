import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import Header from "src/components/Header/header";
import CustomButton from "src/components/Buttons/button";
import useEditClient from "src/hooks/useEditClient";
import { useThemePreference } from "src/providers/ThemeProvider";

export default function EditClient() {
  // Obtenemos carga, estado del formulario y navegación desde el hook
  const {
    notFound,
    isLoading,
    isError,
    error,
    clientName,
    nombre,
    email,
    telefono,
    nif,
    setNombre,
    setEmail,
    setTelefono,
    setNif,
    handleSave,
    handleCancel,
    textInputProps,
    iconColor,
  } = useEditClient();
  const { colors } = useThemePreference();

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header name="Editar cliente" />
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Cargando cliente...</Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header name="Editar cliente" />
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>No se pudo cargar</Text>
          <Text style={styles.notFoundText}>
            {error instanceof Error
              ? error.message
              : "Revisa la conexión e inténtalo de nuevo."}
          </Text>
          <View style={{ height: 12 }} />
          <CustomButton text="Volver" onPress={handleCancel} />
        </View>
      </View>
    );
  }

  // Si no encontramos el cliente, mostramos mensaje de error
  if (notFound) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header name="Editar cliente" />
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Cliente no encontrado</Text>
          <Text style={styles.notFoundText}>
            Vuelve a la lista y selecciona otro cliente.
          </Text>
          <View style={{ height: 12 }} />
          {/* Botón que usa handleCancel del hook para volver atrás */}
          <CustomButton text="Volver" onPress={handleCancel} />
        </View>
      </View>
    );
  }

  // Renderizamos el formulario de edición de cliente
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header name={`Editar ${clientName ?? "cliente"}`} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Datos del cliente
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Actualiza los campos y guarda para aplicar los cambios.
        </Text>

        {/* Editamos el nombre y lo guardamos en `nombre` */}
        <TextInput
          mode="outlined"
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          // textInputProps trae estilos y colores tematizados del hook
          style={textInputProps.style}
          outlineStyle={textInputProps.outlineStyle}
          outlineColor={textInputProps.outlineColor}
          activeOutlineColor={textInputProps.activeOutlineColor}
          textColor={textInputProps.textColor}
          placeholderTextColor={textInputProps.placeholderTextColor}
          selectionColor={textInputProps.selectionColor}
          left={<TextInput.Icon icon="account-outline" color={iconColor} />}
        />

        {/* Editamos el email y lo guardamos en `email` */}
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

        {/* Editamos el teléfono y lo guardamos en `telefono` */}
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

        {/* Editamos el NIF/CIF y lo guardamos en `nif` */}
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

        {/* Dejamos las acciones de guardar o cancelar */}
        <View style={styles.actions}>
          <CustomButton text="Guardar cambios" onPress={handleSave} />
          <View style={{ height: 10 }} />
          <CustomButton text="Cancelar" onPress={handleCancel} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 80,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 8,
  },
  actions: {
    marginTop: 10,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  notFoundText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 6,
    textAlign: "center",
  },
});
