import { supabase } from "supabase/supabaseClient";
import { uploadAvatar } from "src/features/storage/uploadAvatar";
import { getUserProfileById } from "src/services/auth";
import type { UserProfile } from "src/stores/userStore";

export type UploadAvatarPayload = {
  userId: string;
  fileUri: string;
  fallbackEmail?: string;
  fallbackName?: string;
};

export async function uploadUserAvatar({
  userId,
  fileUri,
  fallbackEmail = "",
  fallbackName = "",
}: UploadAvatarPayload): Promise<UserProfile> {
  const path = await uploadAvatar(fileUri, userId);

  const { data: publicData } = supabase.storage
    .from("avatars")
    .getPublicUrl(path);

  const publicUrl = publicData?.publicUrl
    ? `${publicData.publicUrl}?ts=${Date.now()}`
    : null;

  if (!publicUrl) {
    throw new Error("No se pudo obtener la URL del avatar.");
  }

  const { error: updateError } = await supabase.from("profiles").upsert(
    {
      id: userId,
      avatar_url: publicUrl,
    },
    { onConflict: "id" },
  );

  if (updateError) {
    throw updateError;
  }

  const profile = await getUserProfileById(userId, fallbackEmail, fallbackName);
  if (!profile) {
    return {
      id: userId,
      name: fallbackName || "Usuario",
      email: fallbackEmail,
      avatarUrl: publicUrl,
      roleName: "NORMAL",
    };
  }

  return {
    ...profile,
    avatarUrl: publicUrl,
  };
}
