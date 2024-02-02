"use client";

import { useState, useEffect } from "react";
import BrowseMaterialCard from "@/components/BrowseMaterialCard";
import Loading from "@/components/Loading";
import NothingHere from "@/components/NothingHere";
import { Helmet } from "react-helmet";

const MaterialResultsPage = ({ params }) => {
  const courseName = decodeURIComponent(params.courseName);
  const materialCategory = decodeURIComponent(params.materialCategory);
  const [data, setData] = useState(null);

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

  if (data === null) return <Loading />;
  if (data.length === 0) return <NothingHere />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 mx-auto">
      <Helmet>
        <title>{courseName} - {materialCategory} | AcadVault2.0</title>
      </Helmet>
      {data.map((material, index) => {
        return <BrowseMaterialCard key={index} data={material} />;
      })}
    </div>
  );
};

export default MaterialResultsPage;
