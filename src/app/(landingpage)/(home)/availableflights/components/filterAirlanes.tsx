import React from "react";
import { getDataAirplanes } from "../../lib/data";

export default async function FilterAirlanes() {
  const getData = await getDataAirplanes();

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {getData.map((airline) => (
        <label
          key={airline.id}
          htmlFor={airline.name}
          className="font-semibold flex items-center gap-[10px] cursor-pointer has-[:checked]:text-white"
        >
          <input
            type="checkbox"
            name="airlines"
            value={airline.id}
            id={airline.name}
            className="w-[18px] h-[18px] appearance-none cursor-pointer checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
          />
          {airline.name}
        </label>
      ))}
    </div>
  );
}
