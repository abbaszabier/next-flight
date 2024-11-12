"use client";

import { Button } from "@/components/ui/button";
import { getUrlFile } from "@/lib/supabase";
import { Airplane } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ButtonDeleteAirplane from "./deleteAirplane";

export const columns: ColumnDef<Airplane>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const plane = row.original;

      return (
        <Image
          src={getUrlFile(plane.image)}
          width={150}
          height={150}
          placeholder="blur"
          priority={true}
          blurDataURL={getUrlFile(plane.image)}
          alt={plane.name}
        />
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const plane = row.original;

      return (
        <div className="flex gap-5 items-center">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/dashboard/airplanes/edit/${plane?.id}`}>
              <Edit className="w-4 h-4" /> Edit
            </Link>
          </Button>
          <ButtonDeleteAirplane id={plane.id} />
        </div>
      );
    },
  },
];
