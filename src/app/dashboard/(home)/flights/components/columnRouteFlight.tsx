import { formatDate } from "@/lib/utils";
import { Flight } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  flight: Flight;
};

export default function ColumnRouteFlight({ flight }: Props) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="flex flex-col items-center">
        <div className="font-bold">{flight.departureCityCode}</div>
        <div className="font-medium">{flight.departureCity}</div>
        <div className="text-xs">
          {formatDate(flight.departureDate.toISOString())}
        </div>
      </div>
      <ArrowRight size={18} />
      <div className="flex flex-col items-center">
        <div className="font-bold">{flight.destinationCityCode}</div>
        <div className="font-medium">{flight.destinationCity}</div>
        <div className="text-xs">
          {formatDate(flight.arrivalDate.toISOString())}
        </div>
      </div>
    </div>
  );
}
