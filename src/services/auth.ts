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
  avatar_url?: string | null;
};

const DEFAULT_AVATAR_BASE =
  "https://ui-avatars.com/api/?background=E5E7EB&color=111827&size=256&name=";

function buildDefaultAvatar(name: string) {
  const trimmed = name.trim();
  const initial = trimmed ? trimmed[0] : "U";
  return `${DEFAULT_AVATAR_BASE}${encodeURIComponent(initial)}`;
}

function mapProfile(
  profile: DbProfile | null,
  email: string,
  fallbackName = "",
): UserProfile {
  const roleName: RoleName = "NORMAL";
  const safeName = profile?.full_name || fallbackName || "Usuario";
  const avatarPath = profile?.avatar_url ?? null;
  const isFullUrl =
    typeof avatarPath === "string" && avatarPath.startsWith("http");
  const avatarUrl = avatarPath
    ? isFullUrl
      ? avatarPath
      : supabase.storage.from("avatars").getPublicUrl(avatarPath).data.publicUrl
    : buildDefaultAvatar(safeName);
  return {
    id: profile?.id ?? "",
    roleName,
    name: safeName,
    email,
    avatarUrl,
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

  const metadataName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : "";

  // Si el perfil no tiene nombre, lo completamos con el nombre real guardado en auth
  if (metadataName) {
    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: metadataName,
    });
  }

  const profile = await getUserProfileById(
    user.id,
    user.email ?? email,
    metadataName,
  );
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

  // Guardamos el nombre en profiles para que quede persistido
  if (data.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: fullName,
    });
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
  fallbackName = "",
): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, created_at, avatar_url")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return mapProfile(null, fallbackEmail, fallbackName);
    }

    if (error.code === "42703" || error.message?.includes("avatar_url")) {
      const fallback = await supabase
        .from("profiles")
        .select("id, full_name, created_at")
        .eq("id", userId)
        .single();

      if (fallback.error && fallback.error.code !== "PGRST116") {
        return null;
      }

      return mapProfile(
        (fallback.data ?? null) as DbProfile | null,
        fallbackEmail,
        fallbackName,
      );
    }

    return null;
  }

  return mapProfile(data ?? null, fallbackEmail, fallbackName);
}
