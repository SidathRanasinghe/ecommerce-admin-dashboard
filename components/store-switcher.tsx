"use client";
import React, { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/useStoreModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formattedItems = items.map(item => ({
    label: item.name,
    value: item.id,
  }));
  const currentStore = formattedItems.find(
    item => item.value === params?.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setIsOpen(true);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="select the store"
          className={cn("w-[250px] justify-between", className)}
        >
          <StoreIcon className="mr-4 size-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="search store.." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Available stores">
              {formattedItems.map(item => (
                <CommandItem
                  key={item.value}
                  onSelect={() => onStoreSelect(item)}
                  className="cursor-pointer text-sm"
                >
                  <StoreIcon className="mr-3 size-4" />
                  <span>{item.label}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      item?.value === currentStore?.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="cursor-pointer"
                onSelect={() => {
                  setIsOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-3 size-5" />
                Create store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
