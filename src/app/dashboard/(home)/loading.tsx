import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[160px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <Skeleton className="h-[160px] w-full rounded-xl" />
    </div>
  );
}
