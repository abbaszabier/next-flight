import { z } from "zod";

export const SignUpSchemaForm = z.object({
  name: z.string({ message: "Name is required" }),
  passport: z.string().optional(),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string({ message: "Password is required" }).min(6),
});
