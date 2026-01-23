import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { TextInput, type TextInputProps } from "react-native-paper";
import { type BottomNavItem } from "src/components/BottomNav/bottom_nav";
import { useThemePreference } from "src/providers/ThemeProvider";
import { useUserStore } from "src/stores/userStore";
import { createCliente } from "src/types";

export default function useNewClient() {
  // Usamos el router para volver o ir al detalle
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.roleName === "ADMIN";
  const { colors, isDark } = useThemePreference();
  // Guardamos los estados del formulario que vienen de los inputs
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nif, setNif] = useState("");

  // Bloqueamos el guardado si no hay nombre
  const isSaveDisabled = useMemo(() => !nombre.trim(), [nombre]);

  // Creamos el cliente con lo que escribimos en el formulario
  const handleSave = useCallback(async () => {
    // Si no es admin, ignoramos la acción aunque el botón estuviera oculto
    if (!isAdmin) return;
    const nuevo = await createCliente({
      nombre: nombre.trim(),
      email: email.trim() || undefined,
      telefono: telefono.trim() || undefined,
      nifCif: nif.trim() || undefined,
      activo: true,
    });
    router.replace(`/client/${nuevo.id}`);
  }, [email, isAdmin, nif, nombre, router, telefono]);

  // Cancelamos y volvemos atrás
  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  // Definimos la barra inferior con Clientes activo
  const goHome = useCallback(() => {
    router.push("/home");
  }, [router]);

  const goClients = useCallback(() => {
    router.push("/client");
  }, [router]);

  const navItems = useMemo<BottomNavItem[]>(
    () => [
      {
        icon: "home-outline",
        label: "Home",
        onPress: goHome,
        href: "/home",
      },
      {
        icon: "people-outline",
        label: "Clientes",
        onPress: goClients,
        href: "/client",
        active: true,
      },
      { icon: "person-circle-outline", label: "Perfil", href: "/profile" },
      { icon: "settings-outline", label: "Preferencias", href: "/preferences" },
    ],
    [goClients, goHome],
  );

  useEffect(() => {
    // Guardia adicional: si no eres admin, redirigimos fuera de esta ruta
    if (isAdmin) return;
    router.replace("/client");
  }, [isAdmin, router]);

  // Compartimos estilos base para los TextInput, adaptados a tema para que no encandilen en oscuro
  const fieldBackground = isDark ? "#111b2a" : "#f8fafc";
  const placeholderColor = isDark ? "rgba(179,192,207,0.72)" : "#9ca3af";

  const textInputProps: Pick<
    TextInputProps,
    | "outlineStyle"
    | "style"
    | "outlineColor"
    | "activeOutlineColor"
    | "textColor"
    | "placeholderTextColor"
    | "selectionColor"
  > = {
    outlineStyle: { borderRadius: 12, borderColor: colors.border },
    style: { backgroundColor: fieldBackground },
    outlineColor: colors.border,
    activeOutlineColor: colors.primary,
    textColor: colors.text,
    placeholderTextColor: placeholderColor,
    selectionColor: `${colors.primary}99`,
  };

  return {
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
    iconColor: placeholderColor,
    isAdmin,
  };
}
