"use server";

import prisma from "../../../../../../lib/prisma";

export async function getDataAirplanes() {
  try {
    const plane = await prisma.airplane.findMany();

    return plane;
  } catch (error) {
    console.log(error);
    return null;
  }
}
