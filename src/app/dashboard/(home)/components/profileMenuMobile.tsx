"use client";

import React from "react";
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
import { Moon, Settings, Sun, SunMoon, UserRound } from "lucide-react";
import { User } from "@prisma/client";
import { useTheme } from "next-themes";

interface ProfileMenuProps {
  user: User;
}

export default function ProfileMenuMobile({ user }: ProfileMenuProps) {
  const { setTheme, theme } = useTheme();

  return (
    <Menubar className="md:hidden cursor-pointer shadow-none w-fit p-0 border-0 hover:bg-gray-100 rounded-full">
      <MenubarMenu>
        <MenubarTrigger className="px-2 data-[state=open]:bg-gray-100 py-2 rounded-full focus:bg-transparent">
          <Settings strokeWidth={2} className="w-5 h-5 cursor-pointer" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="text-primary focus:bg-white">
            <UserRound size={18} className="mr-2" /> {user?.name} ({user?.role})
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              {theme === "dark" ? (
                <div className="flex flex-row items-center justify-start gap-2">
                  <Moon size={18} className="w-5 h-5" />
                  <span>Dark Mode</span>
                </div>
              ) : theme === "light" ? (
                <div className="flex flex-row items-center justify-start gap-2">
                  <Sun size={18} className="w-5 h-5" />
                  <span>Light Mode</span>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-start gap-2">
                  <SunMoon size={18} className="w-5 h-5" />
                  <span>System Mode</span>
                </div>
              )}
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={() => setTheme("dark")}>Dark</MenubarItem>
              <MenubarItem onClick={() => setTheme("light")}>Light</MenubarItem>
              <MenubarItem onClick={() => setTheme("system")}>
                System
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
