"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardData, type DashboardData } from "@/data/departments";

async function warmRemoteCache() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4");

  if (!response.ok) {
    throw new Error("Unable to load remote data");
  }

  return response.json() as Promise<Array<{ id: number; title: string }>>;
}

export function useDepartments() {
  return useQuery<DashboardData>({
    queryKey: ["vandgross", "departments"],
    queryFn: async () => {
      await warmRemoteCache();
      return dashboardData;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false
  });
}