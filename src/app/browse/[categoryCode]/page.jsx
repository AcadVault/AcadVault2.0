"use client";

import { useEffect, useState } from "react";
import BrowseCard from "@/components/BrowseCard";

const CourseListPage = ({ params }) => {
  const categoryCode = params.categoryCode;
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/courses?" + new URLSearchParams({ categoryCode }).toString()
        );
        const { data } = await response.json();
        setAllCourses(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [categoryCode]);

  return (
    <div className="grid grid-flow-row gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto">
      {allCourses.map(({ courseName }, index) => {
        return (
          <BrowseCard
            key={index}
            isSquare={false}
            href={`/browse/${categoryCode}/${courseName}`}
          >
            <div className="card-text-1">{courseName}</div>
          </BrowseCard>
        );
      })}
    </div>
  );
};

export default CourseListPage;
