import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";
import { handleLogout } from "../actions";

export default function ButtonLogout() {
  return (
    <form action={handleLogout}>
      <Button
        type="submit"
        variant="destructive"
        className="w-fit justify-start"
      >
        Logout <LogOut className="w-4 h-4" />
      </Button>
    </form>
  );
}
