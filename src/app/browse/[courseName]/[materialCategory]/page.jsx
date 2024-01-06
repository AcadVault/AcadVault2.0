"use client";

import { useState, useEffect } from "react";
import MaterialCard from "@/components/MaterialCard";

const MaterialResultsPage = ({ params }) => {
  const courseName = decodeURIComponent(params.courseName);
  const materialCategory = decodeURIComponent(params.materialCategory);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/materials?" +
          new URLSearchParams({ courseName, materialCategory }).toString(),
          {
            method: "GET",
          }
        );
        const { data } = await response.json();
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [courseName, materialCategory]);

  return (
    <div className="left-0 top-0 -z-10 h-full w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row mx-auto w-11/12 sm:w-4/5 md:w-2/3 gap-4 mt-10 ">
        {data.map((material, index) => {
          return (
            <div className="bg-[rgb(246,245,245)] bg-opacity-5 backdrop-filter backdrop-blur-sm hover:outline rounded-lg transition ease-in-out duration-300 px-5 py-3 text-[#ffffff] text-lg hover:outline-2 hover:outline-gray-50 hover:bg-opacity-10 transform hover:-translate-y-1 text-center" key={index} >
              {material.year && (<h2 className="text-white text-lg font-bold">{material.year}</h2>)}
              {material.exam && (<h3 className="text-white text-base font-bold">{material.exam}</h3>)}
              {material.number && (<h3 className="text-white text-base font-semibold">Assignment {material.number}</h3>)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialResultsPage;
