import { supabase } from "supabase/supabaseClient";

function getExtFromUri(uri: string) {
  const parts = uri.split(".");
  const ext = parts[parts.length - 1];
  return ext?.toLowerCase() || "jpg";
}

export async function uploadAvatar(uri: string, userId: string) {
  const ext = getExtFromUri(uri);
  const path = `${userId}/${Date.now()}.${ext}`;

  const res = await fetch(uri);
  const arrayBuffer = await res.arrayBuffer();

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(path, arrayBuffer, {
      contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  return data.path;
}
