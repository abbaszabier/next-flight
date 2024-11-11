import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_IMAGE_SIZE = 3000000; // 3mb

export const airplaneFormSchema = z.object({
  name: z
    .string({ required_error: "Please enter the airplane's name" })
    .min(3, {
      message: "The airplane name must be at least 3 characters long",
    }),
  code: z
    .string({ required_error: "Please enter the airplane's code" })
    .regex(/^[A-Z]{3}-[0-9]{3}$/, {
      message: "The airplane code must be in the format XXX-000",
    }),
  image: z
    .any()
    .refine((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "The image must be a JPEG/JPG/PNG file",
    })
    .refine((file: File) => file.size <= MAX_IMAGE_SIZE, {
      message: "The image must be smaller than 3MB",
    }),
});
