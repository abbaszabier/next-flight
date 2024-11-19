"use server";

import prisma from "../../../../../../lib/prisma";

export async function getDataUsers() {
  try {
    await prisma.user.findMany({
      where: {
        role: "CUSTOMER",
      },
    });
  } catch (error) {
    return [];
    console.log(error);
  }
}
