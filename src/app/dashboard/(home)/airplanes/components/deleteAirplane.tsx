"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Trash } from "lucide-react";
import { deleteDataAirplanesAction } from "../lib/actions";

interface AirplaneProps {
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
        <>
          <Trash /> Deleting...
        </>
      ) : (
        <>
          <Trash /> Delete
        </>
      )}
    </Button>
  );
};

export default function ButtonDeleteAirplane({ id }: AirplaneProps) {
  const deleteAirplaneWithId = async () => {
    await deleteDataAirplanesAction(id);
  };

  return (
    <form action={deleteAirplaneWithId}>
      <ButtonDelete />
    </form>
  );
}
