import Image from "next/image";
import React from "react";

export default function Service() {
  return (
    <section
      id="Services"
      className="container max-w-[1130px] mx-auto flex flex-col pt-[100px] gap-[30px] px-6 md:px-8"
    >
      <h2 className="font-bold text-[32px] leading-[48px] text-center">
        We Ensure You <br />
        Fly With Us Forever
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-[30px]">
        {/* Talented Crew */}
        <div className="flex flex-col gap-[30px] items-center text-center">
          <div className="flex shrink-0 w-[70px] h-[70px] rounded-full items-center justify-center bg-flysha-light-purple">
            <Image
              width={40}
              height={40}
              src="/assets/images/icons/profile-2user.svg"
              alt="icon"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl leading-[36px]">Talented Crew</p>
            <p className="leading-[30px] text-flysha-off-purple">
              Our jets protected by metal that can’t be destroyed.
            </p>
          </div>
        </div>

        {/* Safe Guard */}
        <div className="flex flex-col gap-[30px] items-center text-center">
          <div className="flex shrink-0 w-[70px] h-[70px] rounded-full items-center justify-center bg-flysha-light-purple">
            <Image
              width={40}
              height={40}
              src="/assets/images/icons/shield-tick.svg"
              alt="icon"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl leading-[36px]">Safe Guard</p>
            <p className="leading-[30px] text-flysha-off-purple">
              Our jets protected by metal that can’t be destroyed.
            </p>
          </div>
        </div>

        {/* Best Awards */}
        <div className="flex flex-col gap-[30px] items-center text-center">
          <div className="flex shrink-0 w-[70px] h-[70px] rounded-full items-center justify-center bg-flysha-light-purple">
            <Image
              width={40}
              height={40}
              src="/assets/images/icons/crown.svg"
              alt="icon"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl leading-[36px]">Best Awards</p>
            <p className="leading-[30px] text-flysha-off-purple">
              Our jets protected by metal that can’t be destroyed.
            </p>
          </div>
        </div>

        {/* Pickup at Home */}
        <div className="flex flex-col gap-[30px] items-center text-center">
          <div className="flex shrink-0 w-[70px] h-[70px] rounded-full items-center justify-center bg-flysha-light-purple">
            <Image
              width={40}
              height={40}
              src="/assets/images/icons/building-3.svg"
              alt="icon"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl leading-[36px]">Pickup at Home</p>
            <p className="leading-[30px] text-flysha-off-purple">
              Our jets protected by metal that can’t be destroyed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
