"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import Loading from "@/components/Loading";
import { isAdmin as isEmailAdmin } from "@/lib/server-helper-functions";
import { useEffect, useState } from "react";

const Redirecter = ({ children }) => {
  const session = useSession();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const computeIsAdmin = async () => {
      setIsAdmin(await isEmailAdmin(session.data.user.email));
    };

    if (session.status === "authenticated") {
      computeIsAdmin();
    }
  }, [session]);

  if (session.status === "loading") return <Loading />;
  if (session.status === "unauthenticated" && !(pathname === "/login" || pathname === "/about")) redirect("/login");
  if (session.status === "authenticated" && pathname === "/login") redirect("/");
  //if (isAdmin && pathname === "/requests") redirect("/");

  return children;
};

export default Redirecter;
