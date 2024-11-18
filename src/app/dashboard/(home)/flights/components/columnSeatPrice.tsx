import React, { useMemo } from "react";
import { FlightColumn } from "./columnFlight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatRupiah, mappingSeats } from "@/lib/utils";

type Props = {
  flight: FlightColumn;
};

export default function ColumnSeatPrice({ flight }: Props) {
  const {
    economy,
    business,
    first,
    totalSeatEconomy,
    totalSeatBusiness,
    totalSeatFirst,
  } = useMemo(() => {
    return mappingSeats(flight.seats);
  }, [flight.seats]);

  return (
    <div className="flex justify-center items-center h-full">
      <Accordion type="single" collapsible className="w-[200px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>Economy Class</AccordionTrigger>
          <AccordionContent className="w-[200px]">
            <div className="flex flex-col items-start space-y-2">
              <div className="font-medium">
                <span className="text-primary">Price:</span>{" "}
                {formatRupiah(flight.price)}
              </div>
              <div className="font-medium">
                <span className="text-primary">Seat:</span> {economy}/
                {totalSeatEconomy}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Bussiness Class</AccordionTrigger>
          <AccordionContent className="w-[200px]">
            <div className="flex flex-col items-start space-y-2">
              <div className="font-medium">
                <span className="text-primary">Price:</span>{" "}
                {formatRupiah(flight.price + 500000)}
              </div>
              <div className="font-medium">
                <span className="text-primary">Seat:</span> {business}/
                {totalSeatBusiness}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>First Class</AccordionTrigger>
          <AccordionContent className="w-[200px]">
            <div className="flex flex-col items-start space-y-2">
              <div className="font-medium">
                <span className="text-primary">Price:</span>{" "}
                {formatRupiah(flight.price + 1000000)}
              </div>
              <div className="font-medium">
                <span className="text-primary">Seat:</span> {first}/
                {totalSeatFirst}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
