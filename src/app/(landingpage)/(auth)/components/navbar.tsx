import Link from "next/link";
import Image from "next/image";
import React from "react";

// type Props = {}

export default function Navbar() {
  const menuItems = [
    {
      label: "Flash Sale",
      href: "/flashsale",
    },
    {
      label: "Discover",
      href: "/discover",
    },
    {
      label: "Packages",
      href: "/packages",
    },
    {
      label: "Stories",
      href: "/stories",
    },
    {
      label: "About",
      href: "/about",
    },
  ];

  return (
    <>
      <nav
        id="Navbar"
        className="container max-w-[1130px] mx-auto flex justify-between items-center pt-[30px]"
      >
        <Link href="/" className="flex items-center shrink-0">
          <Image
            width={120}
            height={60}
            src="/assets/images/logos/logo.svg"
            alt="logo"
          />
        </Link>
        <ul className="nav-menus flex gap-[30px] items-center w-fit">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="font-medium text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
