"use client";

import { Airplane, Flight } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { createContext } from "react";
import axios from "axios";

interface FlightProvidersProps {
  children: React.ReactNode;
}

type FlightWIthPlane = Flight & {
  plane: Airplane;
};

export type FContext = {
  flights: FlightWIthPlane[];
  isLoading: boolean;
};

export const FlightContext = createContext<FContext | null>(null);

export default function FlightProviders({ children }: FlightProvidersProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["flights-list"],
    queryFn: () => axios.get("/api/flights").then((res) => res.data.data),
  });
  return (
    <FlightContext.Provider value={{ flights: data, isLoading }}>
      {children}
    </FlightContext.Provider>
  );
}
