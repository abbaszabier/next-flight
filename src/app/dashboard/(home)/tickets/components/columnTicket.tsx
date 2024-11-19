"use client";

import { Flight, FlightSeat, Ticket, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ColumnRouteFlight from "../../flights/components/columnRouteFlight";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TicketType = Ticket & {
  flight: Flight;
  customer: User;
  seat: FlightSeat;
};

export const column: ColumnDef<TicketType>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "customerId",
    header: "Customer",
    cell: ({ row }) => {
      const ticket = row.original;

      return <div>{ticket.customer.name}</div>;
    },
  },
  {
    accessorKey: "flightId",
    header: "Flight Info",
    cell: ({ row }) => {
      const ticket = row.original;

      return <ColumnRouteFlight flight={ticket.flight} />;
    },
  },
  {
    accessorKey: "seatId",
    header: "Seat",
    cell: ({ row }) => {
      const ticket = row.original;

      return <Badge>{ticket.seat.seatNumber}</Badge>;
    },
  },
  {
    id: "statusTransaction",
    header: "Status Transaction",
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <div className="space-y-2">
          <Badge
            className={cn(
              ticket.status === "SUCCESS"
                ? "bg-green-600"
                : ticket.status === "PENDING"
                ? "bg-yellow-500"
                : "bg-red-500"
            )}
          >
            {ticket.status}
          </Badge>
          <div>
            <span>Payment Method</span>
          </div>
        </div>
      );
    },
  },
];
