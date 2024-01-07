"use client";

import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
// import Loading from "@/components/Loading";

const Redirecter = ({ session, isResourceManager, children }) => {
  const pathname = usePathname();
  // if (session.status === "loading") return <Loading />;
  if (!session.user && !(pathname === "/login" || pathname === "/about"))
    redirect("/login");
  if (session.user && pathname === "/login") redirect("/");
  if (!isResourceManager && pathname === "/requests") redirect("/");

  return children;
};

export default Redirecter;
