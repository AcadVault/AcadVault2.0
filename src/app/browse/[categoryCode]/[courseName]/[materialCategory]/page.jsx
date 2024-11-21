"use client";

import { useState, useEffect } from "react";
import BrowseMaterialCard from "@/components/(browse)/BrowseMaterialCard";
import Loading from "@/components/(layout)/Loading";
import NothingHere from "@/components/(layout)/NothingHere";
import { Helmet } from "react-helmet";

const MaterialResultsPage = ({ params }) => {
    const courseName = decodeURIComponent(params.courseName);
    const materialCategory = decodeURIComponent(params.materialCategory);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/materials?" + new URLSearchParams({ courseName, materialCategory }).toString(), { method: "GET" });
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

    const groupedData = data.reduce((acc, material) => {
        const year = material.year || "Uncategorized";
        if (!acc[year]) acc[year] = [];
        acc[year].push(material);
        return acc;
    }, {});

    Object.keys(groupedData).forEach(year => {
        groupedData[year].sort((a, b) => {
            if (a.number !== undefined && b.number !== undefined) {
                return a.number - b.number;
            }

            const nameA = a.name || "";
            const nameB = b.name || "";
            return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: "base" });
        });
    });

    return (
        <div className="mx-auto">
            <Helmet>
                <title>{courseName} - {materialCategory} | AcadVault2.0</title>
            </Helmet>
            {Object.keys(groupedData).sort().map(year => (
                <div key={year}>
                    <h2 className="text-xl font-bold my-4 text-zinc-100">{year === "Uncategorized" ? "" : year}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
                        {groupedData[year].map((material, index) => (
                            <BrowseMaterialCard key={index} data={material} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MaterialResultsPage;