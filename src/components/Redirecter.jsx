"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import Loading from "@/components/Loading";

const Redirecter = ({ children }) => {
  const session = useSession();
  const pathname = usePathname();

  if (session.status === "loading") return <Loading />;
  if (session.status === "unauthenticated" && pathname !== "/login")
    redirect("/login");
  if (session.status === "authenticated" && pathname === "/login")
    redirect("/");
  return children;
};

export default Redirecter;
