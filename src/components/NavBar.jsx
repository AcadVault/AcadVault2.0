"use client";

import { useSession } from "next-auth/react";
import { isAdmin as isEmailAdmin } from "@/lib/server-helper-functions";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = () => {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const activeColor = "#7E57C2";

  useEffect(() => {
    const comupteIsAdmin = async () => {
      setIsAdmin(await isEmailAdmin(session.data.user.email));
    };
    if (session.status === "authenticated") {
      comupteIsAdmin();
    }
  }, [session]);

  const pathname = usePathname();

  return (
    <nav className="bg-white bg-opacity-[0.02]">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            AcadVault2.0
          </span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {session.status === "unauthenticated" ? (
            ""
          ) : (
            <>
              <a
                href="/browse"
                style={{
                  color: pathname === "/browse" ? `${activeColor}` : "",
                  fontWeight: pathname === "/browse" ? "bold" : "",
                }}
                className="text-sm text-[#FFFFFFA0] hover:text-blue-400 transition-all"
              >
                Browse
              </a>
              <a
                href="/new-material"
                style={{
                  color: pathname === "/new-material" ? `${activeColor}` : "",
                  fontWeight: pathname === "/new-material" ? "bold" : "",
                }}
                className="text-sm text-[#FFFFFFA0] hover:text-blue-400 transition-all"
              >
                Upload
              </a>

              {isAdmin && (
                <a
                  href="/requests"
                  style={{
                    color: pathname === "/requests" ? `${activeColor}` : "",
                    fontWeight: pathname === "/requests" ? "bold" : "",
                  }}
                  className="text-sm text-[#FFFFFFA0] hover:text-blue-400 transition-all"
                >
                  Requests
                </a>
              )}
              <a
                href="/me"
                style={{
                  color: pathname === "/me" ? `${activeColor}` : "",
                  fontWeight: pathname === "/me" ? "bold" : "",
                }}
                className="text-sm text-[#FFFFFFA0] hover:text-blue-400 transition-all"
              >
                <FaRegUserCircle className="inline-block w-5 h-5 me-1" /> 
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
