import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { columns } from "./components/columnFlight";
import { DataTable } from "@/components/ui/dataTable";
import { getDataFlights } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Flights",
};

export default async function FlightPage() {
  const flights = await getDataFlights();

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="sm:text-xl md:text-2xl font-bold">Flights</div>
        <Button variant="default" asChild>
          <Link href="/dashboard/flights/create">
            <Plus className="w-4 h-4" /> Create Data
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={flights ? flights : []} />
    </div>
  );
}
