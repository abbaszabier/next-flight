import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/dataTable";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./components/columnsTable";
import { getDataAirplanes } from "./lib/data";

export default async function AirplanesPage() {
  const planes = await getDataAirplanes();

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-2xl font-bold">Airplanes</div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/airplanes/create">
            <Plus className="w-4 h-4" /> Create Data
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={planes} />
    </div>
  );
}
