import { useQuery } from "@tanstack/react-query";
import { travellersApi } from "../api/travellersApi";

export const useTravellersQuery = () =>
  useQuery({
    queryKey: ["travellers"],
    queryFn: travellersApi.list,
  });
