import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "src/components/Header/header";
import CustomButton from "src/components/Buttons/button";
import { clientes } from "src/types";

export default function EditClient() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>(); // Lee el id de la URL
  const clientId = Number(params.id); // Convierte el id

  // Memoiza la búsqueda del cliente
  const client = useMemo(
    () => clientes.find((c) => c.id === clientId),
    [clientId]
  );

  // Estados controlados del formulario, precargados con los datos actuales
  const [nombre, setNombre] = useState(client?.nombre ?? "");
  const [email, setEmail] = useState(client?.email ?? "");
  const [telefono, setTelefono] = useState(client?.telefono ?? "");
  const [nif, setNif] = useState(client?.nifCif ?? "");

  // Simula guardado: imprime y vuelve atrás
  const handleSave = () => {
    console.log("Guardar cliente", {
      id: clientId,
      nombre,
      email,
      telefono,
      nif,
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Header name={`Editar ${client?.nombre ?? "cliente"}`} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Datos del cliente</Text>
        <Text style={styles.subtitle}>
          Actualiza los campos y guarda para aplicar los cambios.
        </Text>

        {/* Campo: nombre */}
        <TextInput
          mode="outlined"
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
          outlineStyle={styles.outline}
          left={<TextInput.Icon icon="account-outline" color="#6b7280" />}
        />

        {/* Campo: email */}
        <TextInput
          mode="outlined"
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          outlineStyle={styles.outline}
          left={<TextInput.Icon icon="email-outline" color="#6b7280" />}
        />

        {/* Campo: teléfono */}
        <TextInput
          mode="outlined"
          label="Teléfono"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
          style={styles.input}
          outlineStyle={styles.outline}
          left={<TextInput.Icon icon="phone-outline" color="#6b7280" />}
        />

        {/* Campo: NIF/CIF */}
        <TextInput
          mode="outlined"
          label="NIF/CIF"
          value={nif}
          onChangeText={setNif}
          style={styles.input}
          outlineStyle={styles.outline}
          left={
            <TextInput.Icon
              icon="card-account-details-outline"
              color="#6b7280"
            />
          }
        />

        {/* Acciones */}
        <View style={styles.actions}>
          <CustomButton text="Guardar cambios" onPress={handleSave} />
          <View style={{ height: 10 }} />
          <CustomButton text="Cancelar" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7fb",
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
  input: {
    backgroundColor: "#fafafa",
  },
  outline: {
    borderRadius: 12,
  },
  actions: {
    marginTop: 10,
  },
});
