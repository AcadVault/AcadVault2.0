"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="fixed left-0 top-0 -z-10 h-full w-full">
      <div className="flex flex-col items-center justify-center h-full text-center content-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
          AcadVault2.0
        </h1>
        <p className="mb-6 text-lg font-medium lg:text-xl sm:px-16 xl:px-48 text-gray-400">
          A living open-source repository of Academic Resources for DA-IICT
        </p>
        <div className="flex flex-row">
          <a href="https://github.com/Acadvault/AcadVault2.0" target="_blank">
            <button className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
              <span className="inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <FaGithub className="w-4 h-4 me-2" /> GitHub
              </span>
            </button>
          </a>
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800"
          >
            <span className="inline-flex items-center pl-4 pr-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <FcGoogle className="w-4 h-4 me-2" /> Login with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
