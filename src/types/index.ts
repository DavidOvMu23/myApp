export type Cliente = {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  nifCif?: string;
  activo?: boolean;
};

export type Pedido = {
  id: string;
  clienteId: string;
  codigo: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "ENTREGADO" | "PREPARADO" | "PENDIENTE_REVISION" | "FINALIZADO";
};
