import { supabase } from "supabase/supabaseClient";
import { type Cliente } from "src/types";

type ClientRow = {
  id: string;
  full_name: string | null;
};

function mapClient(row: ClientRow): Cliente {
  return {
    id: row.id,
    nombre: row.full_name ?? "",
    activo: true,
  };
}

export async function getClients(): Promise<Cliente[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name")
    .order("full_name", { ascending: true });

  if (error || !data) {
    throw new Error("No se pudieron cargar los clientes.");
  }

  return data.map(mapClient);
}

export async function getClientById(id: string): Promise<Cliente | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("No se pudo cargar el cliente.");
  }

  return data ? mapClient(data) : null;
}

export async function createClient(
  payload: Omit<Cliente, "id">,
): Promise<Cliente> {
  throw new Error(
    "Los clientes se crean mediante registro (auth). Usa la pantalla de registro.",
  );
}

export async function updateClient(
  id: string,
  updates: Partial<Cliente>,
): Promise<Cliente | null> {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: updates.nombre ?? null,
    })
    .eq("id", id)
    .select("id, full_name")
    .single();

  if (error) {
    throw new Error("No se pudo actualizar el cliente.");
  }

  return data ? mapClient(data) : null;
}

export async function deleteClient(id: string): Promise<boolean> {
  const { error } = await supabase.from("profiles").delete().eq("id", id);
  if (error) {
    throw new Error("No se pudo eliminar el cliente.");
  }
  return true;
}
