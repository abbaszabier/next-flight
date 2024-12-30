import Navbar from "@/components/navbar";
import { Calendar, PlaneLanding, PlaneTakeoff, Search } from "lucide-react";
import React from "react";
import { SelectDeparture } from "./selectDeparture";
import { SelectArrival } from "./selectArrival";
import { DatePicker } from "./dateRangePicker";
import RunningCompany from "../../(auth)/components/runningCompany";
import { getDataDepartureCity } from "../lib/data";

export default async function Header() {
  const getData = await getDataDepartureCity();

  return (
    <section
      id="Header"
      className="bg-[url('/assets/images/background/airplane.png')] bg-no-repeat bg-cover bg-[center_top] sm:bg-[left_top] -z-10"
    >
      <div className="Header-content bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)] z-0">
        <Navbar />
        <div className="hero-section container max-w-[1130px] w-full mx-auto flex flex-col gap-10 mt-[50px] md:gap-20 md:mt-[100px] px-6 md:px-8">
          {/* Title Section */}
          <div className="title flex flex-col gap-6 md:gap-[30px] text-center md:text-left">
            <h1 className="font-extrabold text-5xl leading-[50px] md:text-7xl md:leading-[90px]">
              Best Flights. <br />
              Cheaper Budget.
            </h1>
            <p className="font-medium text-sm leading-6 md:text-lg md:leading-[36px]">
              No more long queue, get more delicious heavy meals. <br />
              Crafted by best talented people around the world.
            </p>
          </div>

          {/* Form Section */}
          <form className="bg-white text-gray-800 w-full flex flex-col gap-8 lg:flex-nowrap lg:flex-row justify-between items-center rounded-xl p-6 shadow-lg">
            <div className="flex flex-col gap-8 w-full lg:flex-row">
              {/* Departure */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-sm font-medium text-gray-600">
                  Departure
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6">
                    <PlaneTakeoff />
                  </div>
                  {getData && <SelectDeparture getData={getData} />}
                </div>
              </div>

              {/* Arrival */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-sm font-medium text-gray-600">
                  Arrival
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6">
                    <PlaneLanding />
                  </div>
                  {getData && <SelectArrival getData={getData} />}
                </div>
              </div>

              {/* Departure Date */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-sm font-medium text-gray-600">
                  Departure Date
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6">
                    <Calendar />
                  </div>
                  <DatePicker />
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="w-full lg:w-auto h-full">
              <button className="flex flex-row items-center gap-2 justify-center text-center font-bold text-lg font-bold text-flysha-black bg-flysha-light-purple h-full rounded-lg py-4 px-8 shadow-md w-full lg:w-auto">
                <Search />
                Explore
              </button>
            </div>
          </form>
        </div>

        {/* Running Company Section */}
        <RunningCompany />
      </div>
    </section>
  );
}
