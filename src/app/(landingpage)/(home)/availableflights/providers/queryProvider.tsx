"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface QueryClientProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const QCProvider: React.FC<QueryClientProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QCProvider;
