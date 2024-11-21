"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const SignUpButton: React.FC = () => {
  return (
    <Button type="submit" size="lg" className="w-full">
      {"Sign Up"}
    </Button>
  );
};

export default function FormSignUp() {
  return (
    <Card className="w-[480px] shadow rounded-2xl">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4 mt-6">
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="passport">Passport</Label>
                <Input id="passport" placeholder="Enter your passport" />
              </div>
            </div>
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
        <SignUpButton />
        <span className="text-sm text-center w-full mt-4">
          Already have an account?{" "}
          <a href="#" className="text-blue-500">
            Sign In
          </a>
        </span>
      </CardFooter>
    </Card>
  );
}
