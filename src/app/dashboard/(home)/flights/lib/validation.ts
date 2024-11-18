import { z } from "zod";

export const flightFormSchema = z.object({
  planeId: z.string({ required_error: "Please select the airplane" }),
  price: z.string({ required_error: "Please enter the price" }),
  departureCity: z.string({
    required_error: "Please enter the departure location",
  }),
  departureDate: z.date({ required_error: "Please enter the departure date" }),
  departureCityCode: z
    .string({ required_error: "Please enter the city code" })
    .min(3, {
      message: "The departure city code must be at least 3 characters long",
    }),
  destinationCity: z.string({
    required_error: "Please enter the destination location",
  }),
  arrivalDate: z.date({ required_error: "Please enter the arrival date" }),
  destinationCityCode: z.string({
    required_error: "Please enter the destination city code",
  }),
});
