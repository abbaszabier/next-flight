import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Users",
};

export default function UserPage() {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="sm:text-xl md:text-2xl font-bold">Users</div>
      <Button variant="default" asChild>
        <Link href="/dashboard/create">
          <Plus className="w-4 h-4" /> Add Data
        </Link>
      </Button>
    </div>
  );
}
