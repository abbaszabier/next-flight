"use server";

import prisma from "../../../../../../lib/prisma";

export async function getDataFlights() {
  try {
    const flights = await prisma.flight.findMany({
      include: {
        plane: true,
        seats: true,
      },
    });

    return flights;
  } catch (error) {
    return [];
    console.log(error);
  }
}
