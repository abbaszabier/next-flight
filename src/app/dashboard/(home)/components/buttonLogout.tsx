"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { handleLogout } from "../actions";
import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/ui/spinner";
import { LogOut } from "lucide-react";

const Logout: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      variant="unstyled"
      size="icon"
      className="w-full flex justify-start px-2 hover:bg-accent"
    >
      {pending ? (
        <div className="flex gap-2 items-start justify-start">
          <Spinner /> Loading...
        </div>
      ) : (
        <>
          <LogOut className="w-5 h-5 mr-1" size={18} />
          Logout
        </>
      )}
    </Button>
  );
};

export default function ButtonLogout() {
  return (
    <form action={handleLogout} className="w-full flex">
      <Logout />
    </form>
  );
}
