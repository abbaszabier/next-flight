"use server";

import prisma from "../../../../../../lib/prisma";

export async function getDataTickets() {
  try {
    const data = await prisma.ticket.findMany({
      include: {
        flight: true,
        customer: true,
        seat: true,
      },
    });

    return data;
  } catch (error) {
    return [];
    console.log(error);
  }
}
