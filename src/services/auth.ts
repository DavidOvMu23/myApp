import { supabase } from "supabase/supabaseClient";
import { type RoleName, type UserProfile } from "src/stores/userStore";

export type AuthResult = {
  user: UserProfile;
};

export type SignUpResult = {
  needsEmailConfirmation: boolean;
};

type DbProfile = {
  id: string;
  full_name: string | null;
  created_at: string;
};

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=12";

function mapProfile(profile: DbProfile | null, email: string): UserProfile {
  const roleName: RoleName = "NORMAL";
  return {
    id: profile?.id ?? "",
    roleName,
    name: profile?.full_name || email || "Usuario",
    email,
    avatarUrl: DEFAULT_AVATAR,
  };
}

export async function loginWithEmail(
  email: string,
  password: string,
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const user = data.user;
  if (!user) {
    throw new Error("No se pudo obtener el usuario autenticado.");
  }

  const profile = await getUserProfileById(user.id, user.email ?? email);
  if (!profile) {
    throw new Error("No se pudo obtener el perfil del usuario.");
  }

  return { user: profile };
}

export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string,
): Promise<SignUpResult> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    throw error;
  }

  return {
    needsEmailConfirmation: !data.session,
  };
}

export async function clearSession() {
  await supabase.auth.signOut();
}

export async function restoreSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return null;
  }
  return data.session;
}

export async function getUserProfileById(
  userId: string,
  fallbackEmail = "",
): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, created_at")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    return null;
  }

  return mapProfile(data ?? null, fallbackEmail);
}
