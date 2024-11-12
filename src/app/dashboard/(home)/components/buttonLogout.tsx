"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";
import { handleLogout } from "../actions";
import { useFormStatus } from "react-dom";

const Logout: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant="destructive">
      {pending ? (
        "Logging out..."
      ) : (
        <>
          Logout <LogOut className="w-4 h-4" />
        </>
      )}
    </Button>
  );
};

export default function ButtonLogout() {
  return (
    <form action={handleLogout}>
      <Logout />
    </form>
  );
}
