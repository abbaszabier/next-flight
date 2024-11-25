"use client";

import React, { useContext } from "react";
import FlightItem from "./flightItem";
import { FContext, FlightContext } from "../providers/flightProviders";

export default function ListFlights() {
  const { flights } = useContext(FlightContext) as FContext;

  console.log(flights);
  return (
    <div className="ticket-container flex flex-col w-full gap-6">
      <FlightItem />
      <FlightItem />
      <p className="text-center text-sm text-[#A0A0AC] h-fit">
        You’ve reached the end of results.
      </p>
    </div>
  );
}
