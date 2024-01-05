"use client";

import { useState, useEffect } from "react";
import MaterialCard from "@/components/MaterialCard";

const MaterialResultsPage = ({ params }) => {
  const { materialCategory } = params;
  const courseName = decodeURIComponent(params.courseName);

  const [data, setData] = useState([]);
  console.log(params);
  const [filter, setFilter] = useState({ courseName });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/materials", {
          method: "GET",
          params: filter,
        });
        const { data } = await response.json();
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [filter]);

  return (
    <div className="flex flex-col mx-auto w-2/3">
      {data.map((material, index) => {
        return <MaterialCard key={index} data={material} />;
      })}
    </div>
  );
};

export default MaterialResultsPage;
