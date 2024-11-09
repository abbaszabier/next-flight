import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AirplanesPage() {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-2xl font-bold">Airplanes</div>
      <Button variant="default" asChild>
        <Link href="/dashboard/create">
          <Plus className="w-4 h-4" /> Add Data
        </Link>
      </Button>
    </div>
  );
}
