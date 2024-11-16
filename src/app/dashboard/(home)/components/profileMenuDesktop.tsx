"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ButtonLogout from "./buttonLogout";
import { useTheme } from "next-themes";
import { User } from "@prisma/client";

interface ProfileMenuProps {
  user: User;
}

export default function ProfileMenuDesktop({ user }: ProfileMenuProps) {
  const { setTheme, theme } = useTheme();
  const firstLetter = user?.name ? user.name.charAt(0) : "";

  return (
    <Menubar className="hidden md:flex cursor-pointer shadow-none w-fit p-0 border-0 rounded-full">
      <MenubarMenu>
        <MenubarTrigger className="px-2 data-[state=open]:bg-gray-100 py-2 rounded-full focus:bg-transparent data-[state=open]:bg-transparent">
          <div className="flex flex-row items-center justify-start gap-2 cursor-pointer">
            <div className="bg-accent py-2 px-4 text-lg rounded-full">
              {firstLetter}
            </div>
            <div className="text-center flex flex-col items-start justify-center">
              <p className="text-lg font-bold leading-5">{user?.name}</p>
              <p className="text-[12px] text-muted-foreground leading-4">
                {user?.role}
              </p>
            </div>
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              {theme === "dark" ? (
                <div className="flex flex-row items-center justify-start gap-2">
                  <Moon size={18} className="w-5 h-5" />
                  <span>Dark Mode</span>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-start gap-2">
                  <Sun size={18} className="w-5 h-5" />
                  <span>Light Mode</span>
                </div>
              )}
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={() => setTheme("dark")}>
                <Moon className="w-5 h-5 mr-2" />
                Dark Mode
              </MenubarItem>
              <MenubarItem onClick={() => setTheme("light")}>
                <Sun className="w-5 h-5 mr-2" />
                Light Mode
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <span className="w-5 h-5 mr-2">🇬🇧</span> EN
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>🇬🇧 EN</MenubarItem>
              <MenubarItem>🇲🇨 ID</MenubarItem>
              <MenubarItem>🇰🇷 KR</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <ButtonLogout />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
