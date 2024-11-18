import { FlightSeat, TypeSeat } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSeatPerClass = (flightId: string) => {
  const seatClass: TypeSeat[] = ["ECONOMY", "BUSINESS", "FIRST"];
  const seatCode = ["A", "B", "C", "D"];

  const seats: { seatNumber: string; type: TypeSeat; flightId: string }[] = [];

  for (const className of seatClass) {
    for (const code of seatCode) {
      for (let i = 1; i <= 5; i++) {
        seats.push({
          seatNumber: code + i,
          type: className as TypeSeat,
          flightId,
        });
      }
    }
  }

  return seats;
};

export const formatDate = (date: string) => {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${day}/${month}/${year} ${String(hours).padStart(
    2,
    "0"
  )}:${minutes} ${ampm}`;
};

export const formatRupiah = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export const mappingSeats = (seats: FlightSeat[]) => {
  const totalSeatEconomy = seats.filter(
    (seat) => seat.type === "ECONOMY"
  ).length;
  const totalSeatBusiness = seats.filter(
    (seat) => seat.type === "BUSINESS"
  ).length;
  const totalSeatFirst = seats.filter((seat) => seat.type === "FIRST").length;

  const economy = seats.filter(
    (seat) => seat.type === "ECONOMY" && seat.isBooked
  ).length;
  const business = seats.filter(
    (seat) => seat.type === "BUSINESS" && seat.isBooked
  ).length;
  const first = seats.filter(
    (seat) => seat.type === "FIRST" && seat.isBooked
  ).length;

  return {
    economy,
    business,
    first,
    totalSeatEconomy,
    totalSeatBusiness,
    totalSeatFirst,
  };
};
