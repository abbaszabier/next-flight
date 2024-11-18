"use server";

import { ActionResults } from "@/app/dashboard/(auth)/login/lib/actions";
import { redirect } from "next/navigation";
import { flightFormSchema } from "./validation";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { generateSeatPerClass } from "@/lib/utils";

export async function createDataFlightsAction(
  state: ActionResults,
  formData: FormData
): Promise<ActionResults> {
  const departureDate = new Date(formData.get("departureDate") as string);
  const arrivalDate = new Date(formData.get("arrivalDate") as string);

  const validate = flightFormSchema.safeParse({
    planeId: formData.get("planeId"),
    price: formData.get("price"),
    departureCity: formData.get("departureCity"),
    departureDate: departureDate,
    departureCityCode: formData.get("departureCityCode"),
    destinationCity: formData.get("destinationCity"),
    arrivalDate: arrivalDate,
    destinationCityCode: formData.get("destinationCityCode"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Invalid form data",
      errorDecs: errorDesc,
    };
    return {
      errorTitle: "Success",
      errorDecs: [],
    };
  }

  try {
    const data = await prisma.flight.create({
      data: {
        planeId: validate.data.planeId as string,
        price: Number.parseInt(validate.data.price),
        departureCity: validate.data.departureCity as string,
        departureDate: validate.data.departureDate as Date,
        departureCityCode: validate.data.departureCityCode as string,
        destinationCity: validate.data.destinationCity as string,
        arrivalDate: validate.data.arrivalDate as Date,
        destinationCityCode: validate.data.destinationCityCode as string,
      },
    });

    const seat = generateSeatPerClass(data.id);

    await prisma.flightSeat.createMany({
      data: seat,
    });
  } catch (error) {
    console.error(error);

    return {
      errorTitle: "Failed to create flight",
      errorDecs: ["An error occurred while creating flight"],
    };
  }

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export async function getDetailDataFlightsAction(id: string) {
  try {
    const data = await prisma.flight.findFirst({
      where: {
        id: id,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateDataFlightAction(
  state: ActionResults,
  id: string,
  formData: FormData
): Promise<ActionResults> {
  const flightFormSchemaUpdate = flightFormSchema;
  const departureDate = new Date(formData.get("departureDate") as string);
  const arrivalDate = new Date(formData.get("arrivalDate") as string);

  const values = flightFormSchemaUpdate.safeParse({
    planeId: formData.get("planeId"),
    price: formData.get("price"),
    departureCity: formData.get("departureCity"),
    departureDate: departureDate,
    departureCityCode: formData.get("departureCityCode"),
    destinationCity: formData.get("destinationCity"),
    arrivalDate: arrivalDate,
    destinationCityCode: formData.get("destinationCityCode"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Invalid form data",
      errorDecs: errorDesc,
    };
  }

  try {
    await prisma.flight.update({
      where: {
        id: id,
      },
      data: {
        planeId: values.data.planeId as string,
        price: Number.parseInt(values.data.price),
        departureCity: values.data.departureCity as string,
        departureDate: values.data.departureDate as Date,
        departureCityCode: values.data.departureCityCode as string,
        destinationCity: values.data.destinationCity as string,
        arrivalDate: values.data.arrivalDate as Date,
        destinationCityCode: values.data.destinationCityCode as string,
      },
    });
  } catch (error) {
    return {
      errorTitle: "Failed to update airplane",
      errorDecs: [String(error)],
    };
  }

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export async function deleteDataFlightAction(
  id: string
): Promise<ActionResults | undefined> {
  const data = await prisma.flight.findFirst({
    where: {
      id: id,
    },
  });

  if (!data) {
    return {
      errorTitle: "Data not found",
      errorDecs: ["The data you are trying to delete does not exist"],
    };
  }

  try {
    await prisma.flightSeat.deleteMany({
      where: {
        flightId: id,
      },
    });
    await prisma.flight.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      errorTitle: "Failed to delete airplane",
      errorDecs: [String(error)],
    };
  }

  revalidatePath("/dashboard/flights");
}
