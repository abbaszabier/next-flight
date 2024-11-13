import type { Metadata } from "next";
import "../../globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Plane, TicketsPlane, User } from "lucide-react";
import ButtonLogout from "./components/buttonLogout";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

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
      <nav className="border-b border-muted p-5">
        <div className="flex flex-row items-center justify-between">
          <span className="text-lg font-bold text-primary">Dashboard</span>
          <ButtonLogout />
        </div>
      </nav>
      <section className="flex flex-row items-start flex-nowrap grow overflow-hidden">
        <section className="grow-0 w-[20%] h-full shadow p-5 space-y-5">
          <div className="space-y-2">
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="/dashboard">My Dashboard</Link>
            </Button>
          </div>
          <div className="space-y-2">
            <div className="uppercase text-xs font-bold">Master Data</div>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="/dashboard/airplanes">
                <Plane className="mr-2 w-4 h-4" /> Airplanes
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="/dashboard/flights">
                <BookOpen className="mr-2 w-4 h-4" /> Flights
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="/dashboard/tickets">
                <TicketsPlane className="mr-2 w-4 h-4" /> Tickets
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="/dashboard/users">
                <User className="mr-2 w-4 h-4" /> Users
              </Link>
            </Button>
          </div>
        </section>
        <section className="grow h-full overflow-y-auto p-5">
          {children}
        </section>
      </section>
    </section>
  );
}
