import React from "react";
import type { Metadata } from "next";
import "../../globals.css";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import NavbarBottom from "./components/navbarBottom";
import NavbarSide from "./components/navbarSide";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/toaster";
import ProfileMenuMobile from "./components/profileMenuMobile";
import ProfileMenuDesktop from "./components/profileMenuDesktop";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getUser();

  if (session === null || user?.role === "CUSTOMER") {
    redirect("/dashboard/login");
  }

  return (
    <section className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <nav className="border-b border-muted px-5 py-3 md:py-4">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl font-bold text-primary">GoFlight</span>
          <div className="flex flex-row items-center gap-3">
            {user && <ProfileMenuDesktop user={{ ...user, password: "" }} />}
            {user && <ProfileMenuMobile user={{ ...user, password: "" }} />}
          </div>
        </div>
      </nav>
      <section className="flex flex-row md:flex-row grow overflow-hidden">
        {/* Desktop navbar at side */}
        <NavbarSide />

        {/* Main content area */}
        <main className="flex-grow h-full overflow-y-auto p-5">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </main>

        {/* Mobile navbar at bottom */}
        <NavbarBottom />
      </section>
    </section>
  );
}
