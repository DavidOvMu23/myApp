import { useQuery } from "@tanstack/react-query";
import { getClients } from "src/services/clientService";
import { clientsQueryKey } from "src/hooks/queries/queryKeys";

export function useClientsQuery() {
  return useQuery({
    queryKey: clientsQueryKey,
    queryFn: getClients,
  });
}
