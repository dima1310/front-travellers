"use client";

import { useQuery } from "@tanstack/react-query";

export type Category = {
  _id: string;
  name: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://podorozhniky-back.onrender.com";

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, {
    headers: { Accept: "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to load categories");
  }

  const json = await res.json();
  return json.data as Category[]; 
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
