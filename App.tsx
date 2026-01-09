import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import LockIcon from "./src/hooks/login/LockIcon/lock_icon";
import TextfieldEmail from "./src/hooks/login/Textfield/textfield_email";
import TextfieldPassword from "./src/hooks/login/Textfield/textfield_password";
import TextButton from "./src/components/Buttons/text_button";
import Button from "./src/components/Buttons/button";
import GoogleButton from "./src/components/Buttons/google_button";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoginDisabled = !email.trim() || !password.trim();

  return (
    <View style={styles.container}>
      {/* Icono de candado en la parte superior */}
      <LockIcon />

      {/* Título y subtítulo */}
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>
        Introduce tus credenciales para continuar
      </Text>

      {/* Hacemos un view por que queremos alinear la etiqueta de contraseña y el botón de "¿Olvidaste tu contraseña?" en la misma línea */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Correo Electrónico</Text>

        {/*Textfield para el correo electrónico */}
        {
          <TextfieldEmail
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        }

        {/* Hacemos un view por que queremos alinear la etiqueta de contraseña y el botón de "¿Olvidaste tu contraseña?" en la misma línea */}
        <View style={styles.passwordLabelContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextButton text="¿Olvidaste tu contraseña?" />
        </View>

        {/*Textfield para la contraseña */}
        {
          <TextfieldPassword
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        }

        <Button text="Iniciar Sesión" disabled={isLoginDisabled} />

        <View style={[styles.dividerContainer, { marginTop: 30 }]}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>O continúa con</Text>
          <View style={styles.line} />
        </View>

        <GoogleButton text="Google" />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>¿No tienes una cuenta?</Text>
          <TextButton text="Regístrate ahora" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    color: "gray",
    marginBottom: 30,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginLeft: 4,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D0D0D0",
  },
  dividerText: {
    fontSize: 13,
    color: "#999",
  },
  passwordLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 16,
    marginBottom: 20,
  },
  signupText: {
    fontSize: 14,
    color: "#666",
  },
});
