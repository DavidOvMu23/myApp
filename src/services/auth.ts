import AsyncStorage from "@react-native-async-storage/async-storage";
import { roles, usuarios, type RoleName, type User } from "src/types";
import { type UserProfile } from "src/stores/userStore";

// Clave para persistir la sesión en AsyncStorage
const SESSION_KEY = "@myapp/session/v1";

// Tipo de sesión persistida
export type AuthSession = {
  userId: number;
  token: string;
};

// Tipo de resultado del login
export type AuthResult = {
  user: UserProfile;
  token: string;
};

// Simulamos latencia de red con una promesa que resuelve tras ms milisegundos
const wait = (ms = 450) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

// URL de avatar por defecto para perfiles de usuario
const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=12";

// Transformamos un usuario mock en el perfil que consume el frontend
const toProfile = (user: User): UserProfile => {
  // Buscamos el nombre del rol que corresponde al roleId y lo incorporamos al perfil
  const roleName: RoleName =
    roles.find((r) => r.id === user.roleId)?.name ?? "NORMAL";
  return {
    id: user.id,
    roleId: user.roleId,
    roleName,
    name: user.name,
    email: user.email,
    avatarUrl: DEFAULT_AVATAR,
  };
};

// Intentamos autenticar con email y password; lanzamos error si no es válido
export const loginWithEmail = async (
  email: string,
  password: string,
): Promise<AuthResult> => {
  // Simulamos latencia de red para que el loader tenga sentido
  await wait();
  // Normalizamos el email de entrada para compararlo sin mayúsculas ni espacios
  const normalized = email.trim().toLowerCase();
  const user = usuarios.find((u) => u.email.toLowerCase() === normalized);

  if (!user || !password.trim()) {
    throw new Error("Credenciales inválidas");
  }

  // Generamos un token falso; no hay backend real
  const token = `mock-token-${user.id}-${Date.now()}`;
  return {
    user: toProfile(user),
    token,
  };
};

// Persistimos la sesión serializada en storage
export const persistSession = async (session: AuthSession) => {
  // Guardamos userId y token mock (string) para rehidratar en arranques futuros
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

// Borramos la sesión almacenada
export const clearSession = async () => {
  await AsyncStorage.removeItem(SESSION_KEY);
};

// Intentamos restaurar sesión; si hay JSON roto, lo limpiamos
export const restoreSession = async (): Promise<AuthSession | null> => {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch (error) {
    await AsyncStorage.removeItem(SESSION_KEY);
    return null;
  }
};

export const getUserProfileById = async (
  userId: number,
): Promise<UserProfile | null> => {
  // Mock de red para que la UI muestre el estado de carga
  await wait();
  const user = usuarios.find((u) => u.id === userId);
  if (!user) return null;
  return toProfile(user);
};
