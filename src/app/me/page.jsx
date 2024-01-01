"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Loading from "@/components/Loading";

const ProfilePage = () => {
  const session = useSession();
  if (session.status === "loading") return (<Loading/>);
  if (session.status === "unauthenticated") redirect("/login");

  return (
    <div class="fixed left-0 top-0 -z-10 h-full w-full">
      <div class="flex items-center justify-center h-full">
        <div class="container mx-auto ">
            <div class="text-white bg-transparent backdrop-blur-sm bg-opacity-10 border border-gray-500 relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto py-5 px-5">
              <div class="flex justify-center">
                <Image src={session.data.user.image} alt="" width={100} height={100} class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
              </div>
              <div class="mt-16">
                <h1 class="font-bold text-center text-3xl">Hi, {session.data.user.name}!</h1>
                <p class="text-center text-sm text-gray-400 font-medium">{session.data.user.email}</p>
                <div class="flex items-center justify-center mt-3">
                  <button onClick={() => signOut({ callbackUrl: "/login" })} class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Log out
                    </span>
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
