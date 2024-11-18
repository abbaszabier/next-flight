"use client";

import { Button } from "@/components/ui/button";
import { Airplane, Flight, FlightSeat } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import ButtonDeleteFlight from "./deleteFlight";
import Image from "next/image";
import { getUrlFile } from "@/lib/supabase";
import ColumnSeatPrice from "./columnSeatPrice";
import ColumnRouteFlight from "./columnRouteFlight";

export type FlightColumn = Flight & {
  plane: Airplane;
  seats: FlightSeat[];
};

export const columns: ColumnDef<FlightColumn>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "planeId",
    header: "Plane",
    cell: ({ row }) => {
      const flight = row.original;

      const planeImage = getUrlFile(flight.plane.image);

      return (
        <div className="inline-flex items-center gap-4">
          <Image
            src={planeImage}
            alt={flight.plane.name}
            width={100}
            height={100}
            className="rounded-lg"
            style={{ width: "auto", height: "auto" }}
            placeholder="blur"
            priority={true}
            blurDataURL={getUrlFile(flight.plane.image)}
          />
          <div className="font-semibold">{flight.plane.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "destinationCity",
    header: "Route Flight",
    cell: ({ row }) => {
      const flight = row.original;

      return (
        <div className="flex items-center justify-center">
          <ColumnRouteFlight flight={flight} />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price / Seats",
    cell: ({ row }) => {
      const flight = row.original;

      return <ColumnSeatPrice flight={flight} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const flight = row.original;

      return (
        <div className="flex gap-5 items-center justify-center">
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/dashboard/flights/edit/${flight?.id}`}>
              <Edit className="w-4 h-4" /> Edit
            </Link>
          </Button>
          <ButtonDeleteFlight id={flight.id} />
        </div>
      );
    },
  },
];
