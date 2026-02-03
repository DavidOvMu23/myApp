import { create } from "zustand";

export type RoleName = "ADMIN" | "NORMAL";

// Perfil de usuario almacenado en la app
export type UserProfile = {
  id: string;
  roleName?: RoleName;
  name: string;
  email: string;
  avatarUrl?: string;
};

// Estado y acciones del store de usuario
type State = {
  user: UserProfile | null;
};

// Acciones para modificar el estado
type Actions = {
  setUser: (user: UserProfile) => void;
  updateUser: (partial: Partial<UserProfile>) => void;
  clearUser: () => void;
};

// Store de usuario usando Zustand
export const useUserStore = create<State & Actions>((set) => ({
  user: null,
  // Guardamos el perfil completo que llega del auth
  setUser: (user) => set({ user }),
  // Permitimos actualizar campos sueltos sin perder el resto
  updateUser: (partial) =>
    set((state) =>
      state.user
        ? {
            user: {
              ...state.user,
              ...partial,
            },
          }
        : state,
    ),
  // Limpiamos la sesión cuando cerramos sesión o no hay perfil
  clearUser: () => set({ user: null }),
}));
