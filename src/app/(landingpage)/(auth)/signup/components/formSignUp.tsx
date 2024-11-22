"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { ActionResults } from "@/app/dashboard/(auth)/login/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { signUpCustomer } from "../lib/actions";
import { useFormStatus } from "react-dom";

const SignUpButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" size="lg" className="w-full">
      {pending ? "Loading..." : "Sign Up"}
    </Button>
  );
};

const initialFormState: ActionResults = {
  errorTitle: null,
  errorDecs: [],
};

export default function FormSignUp() {
  const { toast } = useToast();
  const [formState, setFormState] = useActionState(
    signUpCustomer,
    initialFormState
  );

  useEffect(() => {
    if (formState.errorTitle) {
      toast({
        title: formState.errorTitle,
        description: (
          <ul className="pl-6 m-0 list-disc">
            {(formState.errorDecs ?? []).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ),
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [formState.errorTitle, formState.errorDecs, toast]);

  return (
    <Card className="w-[480px] shadow rounded-2xl">
      <form action={setFormState}>
        <CardContent>
          <div className="grid w-full items-center gap-4 mt-6">
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter your name" />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="passport">Passport</Label>
                <Input
                  id="passport"
                  name="passport"
                  placeholder="Enter your passport"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <SignUpButton />
          <span className="text-sm text-center w-full mt-4">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-500">
              Sign In
            </Link>
          </span>
        </CardFooter>
      </form>
    </Card>
  );
}
