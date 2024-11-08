"use server";

import prisma from "../../../../../lib/prisma";
import { formSchema } from "./validation";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export interface ActionResults {
  errorTitle: string | null;
  errorDecs: string[] | null;
}

export async function handleLogin(
  state: ActionResults,
  payload: unknown
): Promise<ActionResults> {
  const formData = payload as FormData;

  const values = formSchema.safeParse({
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

  return redirect("/dashboard");
}
