export const clientsQueryKey = ["clients"] as const;
export const clientQueryKey = function clientQueryKey(id: string) {
  return ["clients", id] as const;
};
export const ordersByClientQueryKey = function ordersByClientQueryKey(
  clientId: string,
) {
  return ["orders", "client", clientId] as const;
};
