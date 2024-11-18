import { Metadata } from "next";
import React from "react";
import FormFlight from "../components/formFlight";
import { getDataAirplanes } from "../../airplanes/lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Create Flight",
};

export default async function CreateDataFlights() {
  const getListDataAirplanes = await getDataAirplanes();

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-2xl font-bold">Create Data Flight</div>
      </div>
      <FormFlight type="create" airplanes={getListDataAirplanes || []} />
    </div>
  );
}
