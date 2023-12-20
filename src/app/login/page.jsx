"use client";

import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const session = useSession();
  if (session.status === "loading") return "Loading...";
  if (session.status === "authenticated") redirect("/");
  return (
    <div>
      <div>Login with google</div>
      <div>
        <button onClick={() => signIn("google", { callbackUrl: "/" })}>
          log in
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
