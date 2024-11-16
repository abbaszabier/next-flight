"use client";

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

export default function NavbarBottom() {
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
    <nav className="fixed bottom-0 left-0 right-0 md:hidden shadow-md p-3 flex justify-around border-t border-muted">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center text-xs gap-1"
        >
          <item.icon
            className="w-5 h-5"
            color={isActive(item.href) ? "hsl(var(--primary))" : "#707070"}
            strokeWidth={isActive(item.href) ? 2.5 : 2}
          />
          <span
            className={`${
              isActive(item.href) ? "text-primary" : "text-[#707070]"
            }`}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
