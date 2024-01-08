import React from "react";
import data from "./data.json";
import ContributorCard from "@/components/ContributorCard";
import { FaGithub, FaDiscord } from "react-icons/fa";

const AboutPage = () => {
  const founders = data.founders;
  const managers = [...founders, ...data.resourceManagers];

  return (
    <div className="left-0 top-0 h-full w-full">
      <h1 className="text-3xl font-bold text-white text-center mt-10">
        What is AcadVault2.0?
      </h1>
      <p className="text-lg text-white text-center mt-5 w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 gap-4 p-1 md:p-5 mx-auto">
        The project is based on the vanilla{" "}
        <a
          href="https://github.com/Tikam02/AcadVault"
          className="text-blue-500"
        >
          Acadvault
        </a>{" "}
        GitHub repository of our alumni{" "}
        <a href="https://github.com/Tikam02" className="text-blue-500">
          Tikam Singh Alma
        </a>
        . We aim to maintain a network for an{" "}
        <b className="whitespace-nowrap">Academic Material Sharing Platform</b>.
      </p>
      <h1 className="text-3xl font-bold text-white text-center mt-10">
        Founders
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 gap-4 p-1 md:p-5 mt-5">
        {founders.map((founder, index) => (
          <ContributorCard key={index} data={founder} />
        ))}
      </div>
      <h1 className="text-3xl font-bold text-white text-center mt-10">
        Resource Managers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 gap-4 p-1 md:p-5 mt-5 mb-10">
        {managers.map((manager, index) => (
          <ContributorCard key={index} data={manager} />
        ))}
      </div>
      <footer className="bottom-0 left-0 w-full bg-transparent text-white text-sm p-5">
        <div className="flex justify-between">
          <p>&copy; {new Date().getFullYear()} | AcadVault2.0</p>
          <div className="flex">
            <a
              href="https://github.com/AcadVault/AcadVault2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 hover:scale-110 hover:text-[#211F1F]"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://discord.gg/mbAJsEnXgr"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 hover:scale-110 hover:text-[#7289DA]"
            >
              <FaDiscord size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
