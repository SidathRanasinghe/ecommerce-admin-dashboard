import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismadb";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ storeId: string }>;
}
export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { storeId } = await params;

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });
  if (!store) return redirect("/");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
