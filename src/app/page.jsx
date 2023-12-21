"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession();

  if (session.status === "loading") return "Loading...";
  if (session.status === "unauthenticated") redirect("/login");

  return (
    <div>
      <div>Home Page</div>
      <Link href="/me"> profile </Link>
    </div>
  );
}
