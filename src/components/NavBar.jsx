"use client";

import { useSession } from "next-auth/react";
import { isAdmin as isEmailAdmin } from "@/lib/server-helper-functions";
import { useEffect, useState } from "react";

const NavBar = () => {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const comupteIsAdmin = async () => {
      setIsAdmin(await isEmailAdmin(session.data.user.email));
    };
    if (session.status === "authenticated") {
      comupteIsAdmin();
    }
  }, [session]);

  return (
    <nav className="bg-transparent">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            AcadVault2.0
          </span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a
            href="https://github.com/AcadVault/AcadVault2.0"
            target="_blank"
            className="text-sm  text-gray-500 dark:text-white hover:underline"
          >
            Github
          </a>
          {session.status === "unauthenticated" ? (
            <a
              href="/login"
              className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </a>
          ) : (
            <>
              <a
                href="/new-material"
                className="text-sm text-gray-500 dark:text-white hover:underline"
              >
                Upload
              </a>

              {isAdmin && (
                <a
                  href="/requests"
                  className="text-sm  text-gray-500 dark:text-white hover:underline"
                >
                  Requests
                </a>
              )}
              <a
                href="/me"
                className="text-sm text-gray-500 dark:text-white hover:underline"
              >
                Profile
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
