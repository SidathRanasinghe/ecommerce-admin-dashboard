"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import IconButton from "./common/IconButton";
const MainNav = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "My billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "My sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "My orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <>
      <nav className={cn("space-x-4", className)}>
        <div
          className={cn("hidden items-center space-x-4 lg:flex lg:space-x-6")}
        >
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
          <div className="mx-auto flex items-center justify-center space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        {/* <div className="lg:hidden">
          <Button className="lg:hidden bg-white" onClick={onOpen}>
            <Menu size={25} color="black" />
          </Button>
          <Dialog
            onClose={onClose}
            open={isOpen}
            as="div"
            className="relative z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="flex fixed inset-0">
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto shadow-xl bg-white py-6 pb-4">
                <div className="flex items-center justify-end px-4">
                  <IconButton icon={<X size={20} />} onClick={onClose} />
                </div>
                <div className="mx-auto flex justify-center items-center space-x-4">
                  <UserButton afterSignOutUrl="/" />
                </div>
                <div className="flex flex-col w-full space-y-3 mt-10 items-center">
                  {routes.map((route) => (
                    <Link
                      onClick={onClose}
                      key={route.href}
                      href={route.href}
                      className={cn(
                        " font-medium text-xl transition-colors hover:text-primary",
                        route.active
                          ? "text-black dark:text-white"
                          : "text-muted-foreground"
                      )}
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div> */}
        <div className="lg:hidden">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white lg:hidden" onClick={onOpen}>
                <Menu size={25} color="black" />
              </Button>
            </DialogTrigger>
            <DialogContent className="fixed inset-0 z-40 size-full max-w-none border-0 bg-transparent p-0 lg:hidden">
              <div className="fixed inset-0 bg-black/25" />
              <div className="fixed inset-0 flex">
                <div className="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-6 pb-4 shadow-xl">
                  <div className="flex items-center justify-end px-4">
                    <IconButton icon={<X size={20} />} onClick={onClose} />
                  </div>
                  <div className="mx-auto flex items-center justify-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                  <div className="mt-10 flex w-full flex-col items-center space-y-3">
                    {routes.map(route => (
                      <Link
                        onClick={onClose}
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "text-xl font-medium transition-colors hover:text-primary",
                          route.active
                            ? "text-black dark:text-white"
                            : "text-muted-foreground"
                        )}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
