"use server";

import { ActionResults } from "@/app/dashboard/(auth)/login/lib/actions";
import { SignInSchemaForm } from "./validation";
import prisma from "../../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function signInCustomer(
  state: ActionResults,
  formData: FormData
): Promise<ActionResults> {
  const values = SignInSchemaForm.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!values.success) {
    const errors = values.error.issues.map((error) => error.message);
    return {
      errorTitle: "Invalid Form",
      errorDecs: errors,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: values.data.email,
    },
  });

  if (!existingUser) {
    return {
      errorTitle: "Invalid Credentials",
      errorDecs: ["Email does not exist"],
    };
  }

  const passwordMatch = await bcrypt.compare(
    values.data.password,
    existingUser.password
  );

  if (!passwordMatch) {
    return {
      errorTitle: "Invalid Credentials",
      errorDecs: ["Password is incorrect"],
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/");
}
