"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import ButtonSubmitForm from "../../components/buttonSubmitForm";
import ButtonCancelForm from "../../components/buttonCancelForm";
import { Airplane, Flight } from "@prisma/client";
import { ActionResults } from "@/app/dashboard/(auth)/login/lib/actions";
import { useToast } from "@/hooks/use-toast";
import {
  createDataFlightsAction,
  updateDataFlightAction,
} from "../lib/actions";

interface FormFlightsProps {
  type?: "create" | "edit";
  airplanes?: Airplane[];
  defaultValues?: Flight | null;
}

const initialFormState: ActionResults = {
  errorTitle: null,
  errorDecs: [],
};

export default function FormFlight({
  type,
  airplanes,
  defaultValues,
}: FormFlightsProps) {
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
    formData.set("planeId", formData.get("planeId")?.toString() ?? "");
    formData.set("price", formData.get("price")?.toString() ?? "");
    formData.set(
      "departureCity",
      formData.get("departureCity")?.toString() ?? ""
    );
    formData.set(
      "departureDate",
      formData.get("departureDate")?.toString() ?? ""
    );
    formData.set(
      "departureCityCode",
      formData.get("departureCityCode")?.toString() ?? ""
    );
    formData.set(
      "destinationCity",
      formData.get("destinationCity")?.toString() ?? ""
    );
    formData.set("arrivalDate", formData.get("arrivalDate")?.toString() ?? "");
    formData.set(
      "destinationCityCode",
      formData.get("destinationCityCode")?.toString() ?? ""
    );

    let action;
    if (type === "edit" && defaultValues) {
      action = () =>
        updateDataFlightAction(formState, defaultValues.id, formData);
    } else {
      action = () => createDataFlightsAction(formState, formData);
    }

    const result = await action();
    setFormState(result);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="planeId">Select Plane</Label>
          <Select name="planeId" defaultValue={defaultValues?.planeId}>
            <SelectTrigger id="planeId" name="planeId">
              <SelectValue placeholder="Select Plane" />
            </SelectTrigger>
            <SelectContent>
              {airplanes?.map((value) => (
                <SelectItem key={value.id} value={value.id}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="inline-flex gap-2 items-center">
            <Label htmlFor="price">Price Ticket</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleAlert className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Price for bussiness class increase by Rp 500.000 & first
                    class increase by Rp 1.000.000
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="price"
            name="price"
            defaultValue={defaultValues?.price}
            type="number"
            min={0}
            placeholder="Enter Price"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureCity">Departure City</Label>
          <Input
            id="departureCity"
            name="departureCity"
            defaultValue={defaultValues?.departureCity}
            type="text"
            placeholder="Enter Departure City"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureCityCode">Departure City Code</Label>
          <Input
            id="departureCityCode"
            name="departureCityCode"
            defaultValue={defaultValues?.departureCityCode}
            type="text"
            placeholder="Enter Departure City Code"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            type="datetime-local"
            id="departureDate"
            name="departureDate"
            defaultValue={defaultValues?.departureDate
              ?.toISOString()
              .slice(0, 16)}
            required
            className="block"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="destinationCity">Destination City</Label>
          <Input
            id="destinationCity"
            name="destinationCity"
            defaultValue={defaultValues?.destinationCity}
            type="text"
            placeholder="Enter Destination City"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destinationCityCode">Destination City Code</Label>
          <Input
            id="destinationCityCode"
            name="destinationCityCode"
            defaultValue={defaultValues?.destinationCityCode}
            type="text"
            placeholder="Enter Destination City Code"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Destination Date</Label>
          <Input
            type="datetime-local"
            id="arrivalDate"
            defaultValue={defaultValues?.arrivalDate
              ?.toISOString()
              .slice(0, 16)}
            name="arrivalDate"
            required
            className="block"
          />
        </div>
      </div>
      <div className="flex gap-2 py-2 w-full items-center">
        <ButtonSubmitForm type={type} />
        <ButtonCancelForm href="/dashboard/flights" />
      </div>
    </form>
  );
}
