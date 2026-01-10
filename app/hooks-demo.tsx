import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HooksDemo() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejemplo de Hooks</Text>
      <Text>Contador: {count}</Text>
      <View style={{ marginTop: 8 }}>
        <Button title="Sumar" onPress={() => setCount((c) => c + 1)} />
      </View>

      <Text style={{ marginTop: 16 }}>
        Hora actual: {time.toLocaleTimeString()}
      </Text>

      <View style={{ marginTop: 24 }}>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
});
