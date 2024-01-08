"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";
import { Tektur as Font } from "next/font/google";

const font = Font({ subsets: ["latin"], weight: "400" });
const NavBar = ({ isResourceManager, session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const activeColor = "#D791FF";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white bg-opacity-[0.02] backdrop-filter backdrop-blur-sm">
      <div
        className={`${
          isMenuOpen ? "bg-black bg-opacity-20" : ""
        } flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 transition-all duration-300`}
      >
        <a href="/" className="flex gap-2 items-center rtl:space-x-reverse">
          <Image src="/logo.svg" width={30} height={30} alt="AcadVault Logo" />
          <span
            className={`${font.className} self-center text-2xl font-semibold whitespace-nowrap dark:text-white`}
          >
            AcadVault2.0
          </span>
        </a>
        <div className={"flex flex-col rtl:space-x-reverse"}>
          <button
            className="text-white focus:outline-none lg:hidden"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen
                ? "flex absolute right-5 top-16 py-3 z-50 bg-white bg-opacity-[0.2] backdrop-filter backdrop-blur-sm border border-gray-500 rounded-md  min-w-[200px] items-center text-white"
                : "hidden"
            } flex-col lg:flex lg:flex-row lg:items-center lg:w-auto lg:space-x-6 rtl:space-x-reverse`}
          >
            {session ? (
              <>
                <a
                  href="/browse"
                  style={{
                    color: pathname.includes("/browse") ? `${activeColor}` : "",
                    fontWeight: pathname.includes("/browse") ? "bold" : "",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-white h max-lg:w-full max-lg:h-full max-lg:hover:bg-[#48343422] lg:hover:text-blue-400 transition-all max-lg:px-5 max-lg:py-2 lg:mt-0"
                >
                  Browse
                </a>
                <a
                  href="/new-material"
                  style={{
                    color: pathname === "/new-material" ? `${activeColor}` : "",
                    fontWeight: pathname === "/new-material" ? "bold" : "",
                  }}
                  onClick={() => setIsMenuOpen}
                  className="text-sm text-white w-full h-full hover:bg-[#0002] lg:hover:text-blue-400 transition-all max-lg:px-5 max-lg:py-2 lg:mt-0"
                >
                  Upload
                </a>
                {isResourceManager && (
                  <a
                    href="/requests"
                    style={{
                      color: pathname === "/requests" ? `${activeColor}` : "",
                      fontWeight: pathname === "/requests" ? "bold" : "",
                    }}
                    onClick={() => setIsMenuOpen}
                    className="text-sm text-white w-full h-full hover:bg-[#0002] lg:hover:text-blue-400 transition-all max-lg:px-5 max-lg:py-2 lg:mt-0"
                  >
                    Requests
                  </a>
                )}
                <a
                  href="/about"
                  style={{
                    color: pathname === "/about" ? `${activeColor}` : "",
                    fontWeight: pathname === "/about" ? "bold" : "",
                  }}
                  onClick={() => setIsMenuOpen}
                  className="text-sm text-white w-full h-full hover:bg-[#0002] lg:hover:text-blue-400 transition-all max-lg:px-5 max-lg:py-2 lg:mt-0"
                >
                  About
                </a>
                <a
                  href="/me"
                  style={{
                    color: pathname === "/me" ? `${activeColor}` : "",
                    fontWeight: pathname === "/me" ? "bold" : "",
                  }}
                  onClick={() => setIsMenuOpen}
                  className="text-sm text-white w-full h-full hover:bg-[#0002] lg:hover:text-blue-400 transition-all max-lg:px-5 max-lg:py-2 lg:mt-0"
                >
                  {isMenuOpen ? (
                    "Profile"
                  ) : (
                    <FaRegUserCircle className="inline-block w-5 h-5 me-1" />
                  )}
                </a>
              </>
            ) : (
              <>
                <a
                  href="/about"
                  style={{
                    color: pathname === "/about" ? `${activeColor}` : "",
                    fontWeight: pathname === "/about" ? "bold" : "",
                  }}
                  onClick={() => setIsMenuOpen}
                  className="text-sm text-white w-full h-full hover:bg-[#0002] lg:hover:text-blue-400 transition-all max-lg:px-5 max-lg:py-2 lg:mt-0"
                >
                  About
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
