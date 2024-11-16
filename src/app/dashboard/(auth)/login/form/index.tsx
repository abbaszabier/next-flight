"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ActionResults,
  handleLogin,
} from "@/app/dashboard/(auth)/login/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";

type FormLoginProps = object;

const initialFormState: ActionResults = {
  errorTitle: null,
  errorDecs: [],
};

const SignInButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Loading..." : "Sign In"}
    </Button>
  );
};

const SignUpButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Loading..." : "Sign Up"}
    </Button>
  );
};

const FormLogin: React.FC<FormLoginProps> = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useActionState(
    handleLogin,
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
    <div className="w-full h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Tabs defaultValue="signin" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Please enter your email and password to sign in.
                </CardDescription>
              </CardHeader>
              <form action={setFormState}>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <SignInButton />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Please enter your email and password to sign up.
                </CardDescription>
              </CardHeader>
              <form>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      required
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      required
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <SignUpButton />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FormLogin;
