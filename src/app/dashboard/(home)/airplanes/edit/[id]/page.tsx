import React from "react";
import FormAirplane from "../../components/formAirplane";
import { getDetailDataAirplanesAction } from "../../lib/actions";

type Params = {
  id: string;
};

interface EditDataAirplanesProps {
  params: Params;
}

export default async function EditDataAirplanes({
  params,
}: EditDataAirplanesProps) {
  const { id } = await params;

  const getDetail = await getDetailDataAirplanesAction(id);
  console.log(getDetail);

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-2xl font-bold">Edit Data Airplane</div>
      </div>
      <FormAirplane type="edit" defaultValues={getDetail ?? undefined} />
    </div>
  );
}
