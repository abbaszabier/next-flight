import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {
  href: string;
};

export default function ButtonCancelForm({ href }: Props) {
  return (
    <Link href={href} passHref className="w-full">
      <Button variant="outline" className="w-full">
        Cancel
      </Button>
    </Link>
  );
}
