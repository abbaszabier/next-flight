"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataDepartureProps {
  getData: Array<{
    departureCity: string;
    destinationCity: string;
    _count: {
      departureCity: number;
      destinationCity: number;
    };
  }>;
}

export function SelectDeparture({ getData }: DataDepartureProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? getData.find((data) => data.departureCity === value)
                ?.departureCity
            : "Departure"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 z-100">
        <Command>
          <CommandInput placeholder="Search departure..." />
          <CommandList>
            <CommandEmpty>No Data.</CommandEmpty>
            <CommandGroup>
              {getData?.length === 0 ? (
                <CommandEmpty>No Data.</CommandEmpty>
              ) : (
                getData?.map((data) => (
                  <CommandItem
                    key={data.departureCity}
                    value={data.departureCity}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className={cn("flex items-center justify-between w-full")}
                  >
                    <span>{data.departureCity}</span>
                    {value === data.departureCity && <Check />}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
