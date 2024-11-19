"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const column: ColumnDef<User>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "passport",
    header: "Passport",
  },
];
