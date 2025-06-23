import { auth } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";

import MainNav from "./MainNav";

const Navbar = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b py-2">
      <div className="flex h-14 items-center justify-between px-4">
        <StoreSwitcher items={stores} />
        <MainNav className=" " />
      </div>
    </div>
  );
};

export default Navbar;
