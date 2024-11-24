"use client";

import React from "react";
import { ChevronDown, Ticket } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { User } from "@prisma/client";
import ButtonLogoutCustomer from "@/app/(landingpage)/(home)/components/buttonLogoutCustomer";
import { Button } from "../ui/button";

interface ProfileMenuProps {
  user: User;
}

export default function ProfileCustomer({ user }: ProfileMenuProps) {
  const firstLetter = user?.name ? user.name.charAt(0) : "";

  return (
    <Menubar className="hidden md:flex cursor-pointer shadow-none bg-transparent w-fit p-0 border-0 rounded-full">
      <MenubarMenu>
        <MenubarTrigger className="px-2 data-[state=open]:bg-gray-100 py-2 rounded-full focus:bg-transparent data-[state=open]:bg-transparent">
          <div className="flex flex-row items-center justify-start gap-1 cursor-pointer">
            <div className="bg-accent text-primary py-2 px-4 text-lg rounded-full mr-2">
              {firstLetter}
            </div>
            <div className="text-center text-white flex flex-col items-start justify-center">
              <p className="text-lg font-bold leading-5">{user?.name}</p>
              <p className="text-[12px] text-gray-50 leading-4">{user?.role}</p>
            </div>
            <ChevronDown className="w-4 h-4" color="#ffffff" />
          </div>
        </MenubarTrigger>
        <MenubarContent className="ml-2">
          <Button
            type="submit"
            variant="unstyled"
            size="icon"
            className="w-full flex justify-start px-2 hover:bg-accent"
          >
            <Ticket className="w-5 h-5 mr-1" size={18} />
            My Tickets
          </Button>
          <MenubarSeparator />
          <ButtonLogoutCustomer />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
