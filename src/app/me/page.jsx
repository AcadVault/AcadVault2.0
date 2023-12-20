"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const session = useSession();
  if (session.status === "loading") return "Loading...";
  if (session.status === "unauthenticated") redirect("/login");
  return (
    <div>
      <div>
        <div>{session.data.user.name}</div>
        <div>{session.data.user.email}</div>
        <Image
          src={session.data.user.image}
          width={100}
          height={100}
          alt="profile pic"
        />
      </div>
      <div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
