"use client";

import { Button } from "@/components/ui/button";
import {
  BookOpen,
  LayoutDashboard,
  Plane,
  TicketsPlane,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavbarSide() {
  const pathname = usePathname();

  const isActive = (link: string) => {
    if (link === "/dashboard") {
      return pathname === link;
    }
    return pathname?.startsWith(link);
  };

  const menuItems = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/dashboard/airplanes", label: "Airplanes", icon: Plane },
    { href: "/dashboard/flights", label: "Flights", icon: BookOpen },
    { href: "/dashboard/tickets", label: "Tickets", icon: TicketsPlane },
    { href: "/dashboard/users", label: "Users", icon: User },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:w-[20%] h-full shadow p-5 space-y-5">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            className={`w-full justify-start ${
              isActive(item.href)
                ? "bg-primary text-primary-foreground hover:bg-primary hover:text-white"
                : ""
            }`}
          >
            <Link href={item.href}>
              <item.icon className="mr-2 w-4 h-4" /> {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
}
