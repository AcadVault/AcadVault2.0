"use client";

import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

const Redirecter = ({ session, isResourceManager, children }) => {
    const pathname = usePathname();
    if (!session && !(pathname === "/login" || pathname === "/about" || pathname === "/tos" || pathname === "/privacy")) redirect("/login");
    if (session && pathname === "/login") redirect("/");
    if (!isResourceManager && pathname === "/requests") redirect("/");
    return children;
};

export default Redirecter;