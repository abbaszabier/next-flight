import { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";
import { TypeSeat } from "@prisma/client";

export default async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const params = {
    departure: searchParams.get("departure"),
    arrival: searchParams.get("arrival"),
    date: searchParams.get("date"),
    planeId: searchParams.get("planeId"),
    seat: searchParams.get("seat"),
  };

  let departureDate: Date | null = null;

  if (params.date) {
    departureDate = new Date(params.date);
    departureDate.setHours(1);
  }

  try {
    const data = await prisma.flight.findMany({
      where: {
        departureCity: params.departure !== null ? params.departure : {},
        destinationCity: params.arrival !== null ? params.arrival : {},
        seats:
          params.seat !== null
            ? { some: { type: params.seat as TypeSeat, isBooked: false } }
            : {},
        departureDate: departureDate !== null ? { gte: departureDate } : {},
        planeId: params.planeId
          ? params.planeId.split(",").length > 0
            ? { in: [...params.planeId.split(",")] }
            : {}
          : {},
      },
      include: {
        plane: true,
      },
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
