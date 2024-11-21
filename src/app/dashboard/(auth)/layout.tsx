import type { Metadata } from "next";
import "../../globals.css";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Sign In",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getUser();

  if (session && user?.role === "ADMIN") {
    redirect("/dashboard");
  }

  return <> {children}</>;
}
