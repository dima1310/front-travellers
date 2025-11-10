import { api } from "./axiosConfig";
import type { Traveller } from "@/types/traveller.types";

export const travellersApi = {
  async list(): Promise<Traveller[]> {
    const { data } = await api.get<Traveller[]>("/travellers");
    return data;
  },
};
export const getTravellerById = async (id: string) => {
  const { data } = await axios.get(`/travellers/${id}`);
  return data;
};
