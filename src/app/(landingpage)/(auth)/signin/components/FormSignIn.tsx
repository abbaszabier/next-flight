"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { ActionResults } from "@/app/dashboard/(auth)/login/lib/actions";
import { signInCustomer } from "../lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";

const SignInButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" size="lg" className="w-full">
      {pending ? "Loading..." : "Sign In"}
    </Button>
  );
};

const initialFormState: ActionResults = {
  errorTitle: null,
  errorDecs: [],
};

export default function FormSignIn() {
  const { toast } = useToast();
  const [formState, setFormState] = useActionState(
    signInCustomer,
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
          <SignInButton />
          <span className="text-sm text-center w-full mt-4">
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </span>
        </CardFooter>
      </form>
    </Card>
  );
}
