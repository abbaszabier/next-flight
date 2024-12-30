import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Hamburger } from "../hamburger";
import NavbarAuth from "./navbarAuth";

// type Props = {}

export default function Navbar() {
  const menuItems = [
    {
      label: "Why Us",
      href: "/whyus",
    },
    {
      label: "Discover",
      href: "/discover",
    },
    {
      label: "Testimonials",
      href: "/testimonials",
    },
  ];

  return (
    <nav
      id="Navbar"
      className="container max-w-[1130px] mx-auto flex justify-start gap-4 md:gap-0 md:justify-between items-center pt-[30px] px-6 md:px-0"
    >
      <Hamburger />
      <Link href="/" className="flex items-center shrink-0">
        <Image
          width={120}
          height={60}
          src="/assets/images/logos/logo.svg"
          alt="logo"
          style={{ width: "auto", height: "auto" }}
        />
      </Link>
      <ul className="nav-menus hidden md:flex gap-[30px] items-center w-fit">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="font-medium text-white">
              {item.label}
            </Link>
          </li>
        ))}
        <NavbarAuth />
      </ul>
    </nav>
  );
}
