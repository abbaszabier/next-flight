import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "../../lib/prisma";
import { Lucia, Session, User } from "lucia";
import { RoleUser } from "@prisma/client";
import { cache } from "react";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (session: {
    name: string;
    email: string;
    role: RoleUser;
    passport: string | null;
  }) => {
    return {
      name: session.name,
      email: session.email,
      role: session.role,
      passport: session.passport,
    };
  },
});

export const getUser = cache(
  async (): Promise<{ user: User | null; session: Session | null }> => {
    const sessionId =
      (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { user: null, session: null };
    const { user, session } = await lucia.validateSession(sessionId);
    try {
      if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {
      // Next.js throws error when attempting to set cookies when rendering page
    }
    return { user: user, session: session };
  }
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      name: string;
      email: string;
      role: RoleUser;
      passport: string | null;
    };
  }
}
