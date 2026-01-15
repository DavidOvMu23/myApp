import React, { useState } from "react"; // useState para controlar inputs
import { View, StyleSheet, Text } from "react-native"; // Primitivas de layout
import { useRouter } from "expo-router"; // Navegación
import LockIcon from "../src/hooks/login/LockIcon/lock_icon"; // Icono decorativo
import TextfieldEmail from "../src/hooks/login/Textfield/textfield_email"; // Input de email
import TextfieldPassword from "../src/hooks/login/Textfield/textfield_password"; // Input de password
import TextButton from "../src/components/Buttons/text_button"; // Botón de texto
import Button from "../src/components/Buttons/button"; // Botón principal
import GoogleButton from "../src/components/Buttons/google_button"; // Botón Google

export default function Login() {
  const router = useRouter(); // Para navegar tras iniciar sesión
  const [email, setEmail] = useState(""); // Estado controlado del email
  const [password, setPassword] = useState(""); // Estado controlado del password
  const isLoginDisabled = !email.trim() || !password.trim(); // Valida campos vacíos

  return (
    <View style={styles.container}>
      {/* Logotipo/ícono principal */}
      <LockIcon />

      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>
        Introduce tus credenciales para continuar
      </Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Correo Electrónico</Text>

        {/* Campo controlado: email */}
        <TextfieldEmail value={email} onChangeText={(text) => setEmail(text)} />

        <View style={styles.passwordLabelContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextButton text="¿Olvidaste tu contraseña?" />
        </View>

        {/* Campo controlado: password */}
        <TextfieldPassword
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {/* Botón principal; bloqueado si faltan datos */}
        <Button
          text="Iniciar Sesión"
          disabled={isLoginDisabled}
          onPress={() => router.replace("/home")}
        />

        {/* Separador visual */}
        <View style={[styles.dividerContainer, { marginTop: 30 }]}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>O continúa con</Text>
          <View style={styles.line} />
        </View>

        {/* Login alternativo */}
        <GoogleButton text="Google" />

        {/* CTA de registro */}
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
