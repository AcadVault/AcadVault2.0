"use client";

import { useSession } from "next-auth/react";
import { isAdmin as isEmailAdmin } from "@/lib/server-helper-functions";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = () => {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeColor = "#7E57C2";

  useEffect(() => {
    const computeIsAdmin = async () => {
      setIsAdmin(await isEmailAdmin(session.data.user.email));
    };
    if (session.status === "authenticated") {
      computeIsAdmin();
    }
  }, [session]);

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent">
      <div className={`${isMenuOpen ? "bg-black bg-opacity-20 backdrop backdrop-blur-sm" : ""} flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 transition-all duration-300`}>
        <a href="/" className={`${isMenuOpen ? "hidden" : "flex"} items-center space-x-3 rtl:space-x-reverse`}>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AcadVault2.0</span>
        </a>
        <div className={"flex flex-col rtl:space-x-reverse"}>
          <button className="text-white focus:outline-none lg:hidden" onClick={toggleMenu} >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
              {isMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>)}
            </svg>
          </button>
          <div className={`${isMenuOpen ? "flex" : "hidden"} flex-col lg:flex lg:flex-row lg:items-center lg:w-auto lg:space-x-6 rtl:space-x-reverse`}>
            {session.status === "unauthenticated" ? ("") : (
              <>
                <a href="/browse" style={{ color: pathname === "/browse" ? `${activeColor}` : "", fontWeight: pathname === "/browse" ? "bold" : "", }} className="text-sm text-[#FFFFFFA0] hover:text-blue-400 transition-all mt-2 lg:mt-0"> Browse </a>
                <a href="/new-material" style={{ color: pathname === "/new-material" ? `${activeColor}` : "", fontWeight: pathname === "/new-material" ? "bold" : "", }} className="text-sm text-[#FFFFFFA0] hover:text-blue-400 transition-all mt-2 lg:mt-0"> Upload </a>
                {isAdmin && (<a href="/requests" style={{ color: pathname === "/requests" ? `${activeColor}` : "", fontWeight: pathname === "/requests" ? "bold" : "", }} className="text-sm text-[#FFFFFFA0] hover:text-blue-400 transition-all mt-2 lg:mt-0" > Requests </a>)}
                <a href="/about" style={{ color: pathname === "/about" ? `${activeColor}` : "", fontWeight: pathname === "/about" ? "bold" : "", }} className="text-sm text-[#FFFFFFA0] hover:text-blue-400 transition-all mt-2 lg:mt-0" > About </a>
                <a href="/me" style={{ color: pathname === "/me" ? `${activeColor}` : "", fontWeight: pathname === "/me" ? "bold" : "", }} className="text-sm text-[#FFFFFFA0] hover:text-blue-400 transition-all mt-2 lg:mt-0" > <FaRegUserCircle className="inline-block w-5 h-5 me-1" />{" "} </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
