import React from "react";
import FormAirplane from "../components/formAirplane";

export default function CreateDataAirplanes() {
  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-2xl font-bold">Create Data Airplane</div>
      </div>
      <FormAirplane type="create" />
    </div>
  );
}
