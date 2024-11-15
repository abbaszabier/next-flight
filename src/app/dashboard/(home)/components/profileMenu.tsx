import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ButtonLogout from "./buttonLogout";
import { Settings, UserRound } from "lucide-react";
import { User } from "@prisma/client";

interface ProfileMenuProps {
  user: User;
}

export default function ProfileMenu({ user }: ProfileMenuProps) {
  return (
    <Menubar className="cursor-pointer shadow-none w-fit p-0 border-0 hover:bg-gray-100 rounded-full">
      <MenubarMenu>
        <MenubarTrigger className="px-2 data-[state=open]:bg-gray-100 py-2 rounded-full focus:bg-transparent">
          <Settings strokeWidth={2} className="w-5 h-5 cursor-pointer" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled className="text-primary">
            <UserRound size={18} className="mr-2" /> {user?.name} ({user?.role})
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="py-0 my-0">
            <ButtonLogout />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
