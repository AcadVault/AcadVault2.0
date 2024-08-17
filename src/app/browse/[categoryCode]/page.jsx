"use client";

import { useEffect, useState } from "react";
import BrowseCard from "@/components/BrowseCard";
import { Helmet } from "react-helmet";

const CourseListPage = ({ params }) => {
    const categoryCode = params.categoryCode;
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/courses?" + new URLSearchParams({ categoryCode }).toString());
                const { data } = await response.json();
                setAllCourses(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [categoryCode]);

    return (
        <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto">
            <Helmet>
                <title>Browse {categoryCode} | AcadVault2.0</title>
            </Helmet>
            {allCourses.map(({ courseName }, index) => { return (<BrowseCard key={index} isSquare={true} href={`/browse/${categoryCode}/${courseName}`}><div className="card-text-2">{courseName}</div></BrowseCard>); })}
        </div>
    );
};

export default CourseListPage;