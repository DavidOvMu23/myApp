import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";

import LockIcon from "../src/hooks/login/LockIcon/lock_icon";
import TextfieldEmail from "../src/hooks/login/Textfield/textfield_email";
import TextfieldPassword from "../src/hooks/login/Textfield/textfield_password";
import TextButton from "../src/components/Buttons/text_button";
import Button from "../src/components/Buttons/button";
import GoogleButton from "../src/components/Buttons/google_button";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoginDisabled = !email.trim() || !password.trim();

  // Guard to surface which import is invalid instead of throwing a cryptic React error
  const components = {
    LockIcon,
    TextfieldEmail,
    TextfieldPassword,
    Button,
    GoogleButton,
    TextButton,
  };

  const invalidEntries = Object.entries(components).filter(
    ([, comp]) => typeof comp !== "function"
  );

  if (invalidEntries.length) {
    console.error("Componente no es función", invalidEntries);
    return (
      <View style={styles.container}>
        <Text>
          Componente inválido: {invalidEntries.map(([name]) => name).join(", ")}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LockIcon />

      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>
        Introduce tus credenciales para continuar
      </Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Correo Electrónico</Text>

        <TextfieldEmail value={email} onChangeText={(text) => setEmail(text)} />

        <View style={styles.passwordLabelContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextButton text="¿Olvidaste tu contraseña?" />
        </View>

        <TextfieldPassword
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          text="Iniciar Sesión"
          disabled={isLoginDisabled}
          onPress={() => router.replace("/home")}
        />

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
