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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row mx-auto w-2/3 gap-4 mt-10 ">
      {data.map((material, index) => {
        return (
          <div
            className="px-3 py-3 bg-white bg-opacity-5 text-center rounded-md hover:bg-opacity-10 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
            key={index}
          >
            {material.year && (
              <h2 className="text-white text-lg font-bold">{material.year}</h2>
            )}
            {material.exam && (
              <h3 className="text-white text-base font-bold">
                {material.exam}
              </h3>
            )}
            {material.number && (
              <h3 className="text-white text-base font-semibold">
                Assignment {material.number}
              </h3>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MaterialResultsPage;
