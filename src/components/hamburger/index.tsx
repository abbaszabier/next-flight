import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetContent,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Hamburger() {
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
    <Sheet>
      {/* Hamburger Trigger */}
      <SheetTrigger asChild>
        <Button className="block md:hidden bg-white text-[#000000] hover:bg-[#fff]">
          <Menu />
        </Button>
      </SheetTrigger>

      {/* Hamburger Menu Content */}
      <SheetContent side="left" className="p-4 bg-gray-800 text-white">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetHeader>
        <nav className="space-y-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block font-medium text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/signin">
            <button className="w-full font-bold text-flysha-black bg-flysha-light-purple rounded-full py-2 transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]">
              Sign In
            </button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
