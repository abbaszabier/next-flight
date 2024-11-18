"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Trash } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { deleteDataFlightAction } from "../lib/actions";

interface FlightProps {
  id: string;
}

const ButtonDelete = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      size="sm"
      type="submit"
      variant="outlineDestructive"
      disabled={pending}
    >
      {pending ? (
        <div className="flex gap-2 items-center">
          <Spinner /> Loading...
        </div>
      ) : (
        <>
          <Trash /> Delete
        </>
      )}
    </Button>
  );
};

export default function ButtonDeleteFlight({ id }: FlightProps) {
  const deleteFlightWithId = async () => {
    await deleteDataFlightAction(id);
  };

  return (
    <form action={deleteFlightWithId}>
      <ButtonDelete />
    </form>
  );
}
