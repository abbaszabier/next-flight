import { getUser } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import ProfileCustomer from "./profleCustomer";

export default async function NavbarAuth() {
  const { session, user } = await getUser();

  return (
    <>
      {session && user?.role === "CUSTOMER" ? (
        user && <ProfileCustomer user={{ ...user, password: "" }} />
      ) : (
        <div className="inline-flex items-center gap-3">
          <Link href="/signin">
            <button className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]">
              Sign In
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
