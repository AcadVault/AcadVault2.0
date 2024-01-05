"use client";

import { GiOpenBook } from "react-icons/gi";
import { PiUploadSimpleBold } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="fixed left-0 top-0 -z-10 h-full w-full">
      <div className="relative flex flex-col items-center justify-center h-full text-center content-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          AcadVault2.0
        </h1>
        <p className="mb-6 text-lg font-medium text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          A living open-source repository of{" "}
          <span className="font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
            Academic Resources for DA-IICT
          </span>
        </p>
        <div className="flex flex-row">
          <a href="https://github.com/Acadvault/AcadVault2.0" target="_blank">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <FaGithub className="w-4 h-4 me-2" />
                GitHub
              </span>
            </button>
          </a>
          <a href="/browse-material">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <GiOpenBook className="w-4 h-4 me-2" />
                Browse
              </span>
            </button>
          </a>
          <a href="/new-material">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <PiUploadSimpleBold className="w-4 h-4 me-2" />
                Upload
              </span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
