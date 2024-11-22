"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

const SignInButton: React.FC = () => {
  return (
    <Button type="submit" size="lg" className="w-full">
      {"Sign In"}
    </Button>
  );
};

export default function FormSignIn() {
  return (
    <Card className="w-[480px] shadow rounded-2xl">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4 mt-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="passwprd"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <SignInButton />
        <span className="text-sm text-center w-full mt-4">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
}
