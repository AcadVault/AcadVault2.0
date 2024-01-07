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

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto">
      {data.map((material, index) => {
        return <BrowseMaterialCard key={index} data={material} />;
      })}
    </div>
  );
};

export default MaterialResultsPage;
