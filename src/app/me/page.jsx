"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const session = useSession();
  if (session.status === "loading") return "";
  if (session.status === "unauthenticated") redirect("/login");

  return (
    <div class="fixed left-0 top-0 -z-10 h-full w-full">
      <div class="flex items-center justify-center h-full">
        <div class="flex flex-col items-center justify-center text-center text-white bg-transparent py-5 px-5 mx-auto w-11/12 sm:w-2/3 md:w-1/2 rounded-lg backdrop-blur-sm bg-opacity-10 border border-gray-50">
          <div class="text-lg font-bold">{session.data.user.name}</div>
          <div class="text-gray-500 text-sm mb-4">{session.data.user.email}</div>
          <Image src={session.data.user.image} width={100} height={100} alt="profile pic" class="rounded-full w-2/3 sm:w-1/2 md:w-1/3 mb-4"/>
          <button onClick={() => signOut({ callbackUrl: "/login" })} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span class="relative inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Log out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
