import React from "react";
import { TypeSeat } from "@prisma/client";

const SEAT_OPTION: TypeSeat[] = ["ECONOMY", "BUSINESS", "FIRST"];

export default function FilterSeat() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Seat Class</p>
      {SEAT_OPTION.map((seat, i) => (
        <label
          htmlFor={seat}
          key={i}
          className="font-semibold flex items-center cursor-pointer gap-[10px] has-[:checked]:text-white"
        >
          <input
            type="radio"
            name="seat"
            value={seat}
            id={seat}
            className="w-[18px] h-[18px] appearance-none cursor-pointer checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
          />
          {seat}
        </label>
      ))}
    </div>
  );
}
