import { DataTable } from "@/components/ui/dataTable";
import { Metadata } from "next";
import React from "react";
import { column } from "./components/columnUser";
import { getDataUsers } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Users",
};

export default async function UserPage() {
  const users = await getDataUsers();

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="sm:text-xl md:text-2xl font-bold">Users</div>
      </div>
      <DataTable columns={column} data={users || []} />
    </div>
  );
}
