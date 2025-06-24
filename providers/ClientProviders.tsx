"use client";

import type React from "react";

import { ModalProvider } from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <>
      <ToastProvider />
      <ModalProvider />
      {children}
    </>
  );
}
