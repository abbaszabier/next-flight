import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingFilterAirlanes() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {[0, 1, 2].map((val) => (
        <label
          key={val}
          className="font-semibold flex items-center gap-[10px] text-white"
        >
          <Skeleton className="w-[24px] bg-white h-[24px] rounded-lg" />
          <Skeleton className="w-[100px] bg-white h-[24px]" />
        </label>
      ))}
    </div>
  );
}
