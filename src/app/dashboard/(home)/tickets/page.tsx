import { DataTable } from "@/components/ui/dataTable";
import { Metadata } from "next";
import React from "react";
import { column } from "./components/columnTicket";
import { getDataTickets } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Tickets",
};

export default async function TicketPage() {
  const tickets = await getDataTickets();
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="sm:text-xl md:text-2xl font-bold">Tickets</div>
      </div>
      <DataTable columns={column} data={tickets || []} />
    </div>
  );
}
