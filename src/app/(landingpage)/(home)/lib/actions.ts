"use server";

import { getUser, lucia } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogoutCustomer(): Promise<void> {
  const userSession = await getUser();

  if (!userSession || !userSession.session) {
    return;
  }

  await lucia.invalidateSession(userSession.session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  revalidatePath("/");
  redirect("/");
}
