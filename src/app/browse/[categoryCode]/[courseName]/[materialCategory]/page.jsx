"use client";

import { useState, useEffect } from "react";
import BrowseMaterialCard from "@/components/BrowseMaterialCard";

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
  
  if(data.length === 0) return (
    <div className="flex justify-center items-center h-96">
      <div className="text-2xl font-bold text-gray-500">
        Nothing here!
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {data.map((material, index) => {
        return <BrowseMaterialCard key={index} data={material} />;
      })}
    </div>
  );
};

export default MaterialResultsPage;
