import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TextInput, type TextInputProps } from "react-native-paper";
import { useThemePreference } from "src/providers/ThemeProvider";
import { getClienteById, updateCliente } from "src/types";

export default function useEditClient() {
  // Usamos el router para volver o salir
  const router = useRouter();
  // Leemos el id que llega en la URL
  const params = useLocalSearchParams<{ id?: string }>();
  const clientId = Number(params.id);
  const { colors, isDark } = useThemePreference();

  // Guardamos el nombre para el título y un flag de no encontrado
  const [clientName, setClientName] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Guardamos los estados del formulario que llegan de los inputs
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nif, setNif] = useState("");

  // Cargamos los datos del cliente para rellenar el formulario
  const loadClient = useCallback(async () => {
    // Traemos el cliente por id; si no existe, marcamos notFound para pintar estado vacío
    const client = await getClienteById(clientId);
    if (!client) {
      setClientName(null);
      setNotFound(true);
      return;
    }
    setNotFound(false);
    setClientName(client.nombre);
    setNombre(client.nombre ?? "");
    setEmail(client.email ?? "");
    setTelefono(client.telefono ?? "");
    setNif(client.nifCif ?? "");
  }, [clientId]);

  // Volvemos a cargar los datos si cambia el id
  useEffect(() => {
    if (Number.isNaN(clientId)) {
      setClientName(null);
      setNotFound(true);
      return;
    }
    // Re-ejecutamos la carga cada vez que la ruta cambia de id
    void loadClient();
  }, [clientId, loadClient]);

  // Guardamos cambios y volvemos atrás
  const handleSave = useCallback(() => {
    // Usamos el estado local del formulario para construir el payload; trim para limpiar espacios
    updateCliente(clientId, {
      nombre: nombre.trim(),
      email: email.trim() || undefined,
      telefono: telefono.trim() || undefined,
      nifCif: nif.trim() || undefined,
    }).then(() => {
      router.back();
    });
  }, [clientId, email, nif, nombre, router, telefono]);

  // Cancelamos y volvemos a la pantalla anterior
  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  // Compartimos estilos base para los TextInput, (lo ha hecho el chat)
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
    notFound,
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
    iconColor: placeholderColor,
  };
}
