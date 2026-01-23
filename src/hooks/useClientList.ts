import { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { type BottomNavItem } from "src/components/BottomNav/bottom_nav";
import { useUserStore } from "src/stores/userStore";
import { listClientes, type Cliente } from "src/types";

export default function useClientList() {
  // Usamos el router para movernos entre pantallas
  const router = useRouter();
  // Guardamos la lista de clientes que pintamos en la pantalla
  const [items, setItems] = useState<Cliente[]>([]);
  // Leemos el usuario actual para permisos
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.roleName === "ADMIN";

  // Recargamos los clientes cuando volvemos a esta pantalla
  const loadClientes = useCallback(() => {
    // Evitamos setState en desmontado con un flag local
    let active = true;
    listClientes().then((data) => {
      if (active) setItems(data);
    });
    return () => {
      active = false;
    };
  }, []);

  useFocusEffect(loadClientes);

  // Abrimos Home desde la barra inferior
  const goHome = useCallback(() => {
    router.push("/home");
  }, [router]);

  // Dejamos Clientes activo en la barra inferior
  const goClients = useCallback(() => {
    router.push("/client");
  }, [router]);

  // Navegamos al detalle del cliente pulsado
  const handleOpenClient = useCallback(
    (id: number) => {
      // id llega desde el item pulsado en la lista
      router.push(`/client/${id}`);
    },
    [router],
  );

  // Atajo para crear un cliente nuevo
  const handleCreate = useCallback(() => {
    // Solo admins ven/usan el FAB; protegemos también aquí
    if (!isAdmin) return;
    router.push("/client/new");
  }, [isAdmin, router]);

  // Definimos la barra inferior con Clientes activo
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
      {
        icon: "person-circle-outline",
        label: "Perfil",
        href: "/profile",
      },
      {
        icon: "settings-outline",
        label: "Preferencias",
        href: "/preferences",
      },
    ],
    [goClients, goHome],
  );

  return {
    items,
    navItems,
    handleOpenClient,
    handleCreate,
    canCreate: isAdmin,
  };
}
