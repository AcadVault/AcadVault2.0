"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const ProfilePage = () => {
  const session = useSession();

  return (
    <div className="fixed left-0 top-0 -z-10 h-full w-full">
      <div className="flex items-center justify-center h-full">
        <div className="container mx-auto ">
          <div className="relative bg-[rgb(246,245,245)] bg-opacity-5 backdrop-filter backdrop-blur-sm outline outline-1 outline-gray-500 rounded-lg transition ease-in-out duration-300 p-3 text-[#ffffff] w-11/12 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto py-5 px-5">
            <div className="flex justify-center">
              <Image src={session.data.user.image} alt="" width={100} height={100} priority={true} className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
            </div>
            <div className="mt-16">
              <h1 className="font-bold text-center text-3xl"> Hi, {session.data.user.name}! </h1>
              <p className="text-center text-sm text-gray-400 font-medium"> {session.data.user.email}</p>
              <div className="flex items-center justify-center mt-3">
                <button onClick={() => signOut({ callbackUrl: "/login" })} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" >
                  <span className="relative inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"> Log out </span>
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
