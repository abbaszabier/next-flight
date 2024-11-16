import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  type?: "create" | "edit";
};

export default function ButtonSubmitForm({ type }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <div className="flex gap-2 items-center">
          <Spinner /> Loading...
        </div>
      ) : type === "edit" ? (
        "Update"
      ) : (
        "Create"
      )}
    </Button>
  );
}
