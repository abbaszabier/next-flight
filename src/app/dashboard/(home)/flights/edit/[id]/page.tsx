import React from "react";
import { getDetailDataFlightsAction } from "../../lib/actions";
import FormFlight from "../../components/formFlight";
import { getDataAirplanes } from "../../../airplanes/lib/data";
import { Metadata } from "next";

type Params = {
  id: string;
};

interface EditDataAirplanesProps {
  params: Promise<Params>;
}

export const metadata: Metadata = {
  title: "Dashboard | Edit Flight",
};

export default async function EditDataFlights({
  params,
}: EditDataAirplanesProps) {
  const { id } = await params;
  const getListDataAirplanes = await getDataAirplanes();
  const getDetail = await getDetailDataFlightsAction(id);

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-2xl font-bold">Edit Data Airplane</div>
      </div>
      <FormFlight
        type="edit"
        defaultValues={getDetail ?? undefined}
        airplanes={getListDataAirplanes || []}
      />
    </div>
  );
}
