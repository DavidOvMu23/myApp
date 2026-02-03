import { supabase } from "supabase/supabaseClient";
import { type Pedido } from "src/types";

type OrderRow = {
  id: string;
  discogs_id: number;
  user_id: string;
  rented_at: string;
  due_at: string | null;
  returned_at: string | null;
};

function toDateLabel(value: string | null): string {
  if (!value) return "";
  return value.slice(0, 10);
}

function resolveStatus(row: OrderRow): Pedido["estado"] {
  if (row.returned_at) return "FINALIZADO";
  return "PREPARADO";
}

function mapOrder(row: OrderRow): Pedido {
  return {
    id: row.id,
    clienteId: row.user_id,
    codigo: `DISC-${row.discogs_id}`,
    fechaInicio: toDateLabel(row.rented_at),
    fechaFin: toDateLabel(row.due_at),
    estado: resolveStatus(row),
  };
}

export async function getOrdersByClientId(clientId: string): Promise<Pedido[]> {
  const { data, error } = await supabase
    .from("rentals")
    .select("id, discogs_id, user_id, rented_at, due_at, returned_at")
    .eq("user_id", clientId)
    .order("rented_at", { ascending: false });

  if (error || !data) {
    throw new Error("No se pudieron cargar los pedidos.");
  }

  return data.map(mapOrder);
}
