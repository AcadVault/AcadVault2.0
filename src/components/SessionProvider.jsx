"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SessionProvider as Provider } from "next-auth/react";

const SessionProvider = ({ children }) => {
  const session = useSession();

  if (session.status === "loading") return "";
  if (session.status === "unauthenticated") redirect("/login");

  return <Provider>{children}</Provider>;
};

export default SessionProvider;
