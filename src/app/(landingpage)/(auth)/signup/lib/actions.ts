"use server";

import { ActionResults } from "@/app/dashboard/(auth)/login/lib/actions";
import { SignUpSchemaForm } from "./validation";
import bcrypt from "bcrypt";
import prisma from "../../../../../../lib/prisma";
import { redirect } from "next/navigation";

export async function signUpCustomer(
  state: ActionResults,
  formData: FormData
): Promise<ActionResults> {
  const validate = SignUpSchemaForm.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passport: formData.get("passport"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Invalid form data",
      errorDecs: errorDesc,
    };
  }

  const hashingPassword = bcrypt.hashSync(validate.data.password, 10);

  try {
    await prisma.user.create({
      data: {
        email: validate.data.email,
        name: validate.data.name,
        password: hashingPassword,
        passport: validate.data.passport,
        role: "CUSTOMER",
      },
    });
  } catch (error) {
    return {
      errorTitle: "Failed to delete airplane",
      errorDecs: [String(error)],
    };
  }

  redirect("/signin");
}
