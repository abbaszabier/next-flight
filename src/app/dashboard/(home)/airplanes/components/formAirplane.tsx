"use client";

import { ActionResults } from "@/app/dashboard/(auth)/login/lib/actions";
import { Input } from "@/components/ui/input";
import InputFile from "@/components/ui/inputFile";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  createDataAirplanesAction,
  updateDataAirplanesAction,
} from "../lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Airplane } from "@prisma/client";
import ButtonSubmitForm from "../../components/buttonSubmitForm";
import ButtonCancelForm from "../../components/buttonCancelForm";

interface FormAirplaneProps {
  type?: "create" | "edit";
  defaultValues?: Airplane;
}

const initialFormState: ActionResults = {
  errorTitle: null,
  errorDecs: [],
};

export default function FormAirplane({
  type,
  defaultValues,
}: FormAirplaneProps) {
  const [formState, setFormState] = useState(initialFormState);
  const { toast } = useToast();

  useEffect(() => {
    if (formState.errorTitle) {
      toast({
        title: formState.errorTitle,
        description: (
          <ul className="pl-6 m-0 list-disc">
            {(formState.errorDecs ?? []).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ),
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [formState.errorTitle, formState.errorDecs, toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    formData.set("name", formData.get("name")?.toString() ?? "");
    formData.set("code", formData.get("code")?.toString() ?? "");

    let action;
    if (type === "edit" && defaultValues) {
      action = () =>
        updateDataAirplanesAction(formState, defaultValues.id, formData);
    } else {
      action = () => createDataAirplanesAction(formState, formData);
    }

    const result = await action();
    setFormState(result);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code">Code</Label>
        <Input
          id="code"
          defaultValue={defaultValues?.code}
          name="code"
          type="text"
          placeholder="Enter Airplane Code"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          defaultValue={defaultValues?.name}
          name="name"
          type="text"
          placeholder="Enter Airplane Name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload Image</Label>
        <InputFile ButtonName={"Upload"} isRefresh fileLimit={1} />
      </div>
      <div className="flex gap-2 py-2 w-full items-center">
        <ButtonSubmitForm type={type} />
        <ButtonCancelForm href="/dashboard/airplanes" />
      </div>
    </form>
  );
}
