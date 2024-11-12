import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Flights",
};

export default function FlightPage() {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-2xl font-bold">Flights</div>
      <Button variant="default" asChild>
        <Link href="/dashboard/create">
          <Plus className="w-4 h-4" /> Add Data
        </Link>
      </Button>
    </div>
  );
}
