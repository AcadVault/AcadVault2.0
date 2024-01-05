"use client";

import { useEffect, useState } from "react";

const BrowseMaterialPage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/courses?courseName=*");
      const { data } = await response.json();
      setAllCourses(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="left-0 top-0 -z-10 h-full w-full">
      <div className="grid grid-flow-row gap-3 grid-cols-1 md:grid-cols-2 mx-auto mt-10 w-11/12 md:w-4/5">
        {allCourses.map(({ courseName }, index) => {
          return (
            <div key={index}>
              <a href={`/browse/${courseName}`}>
                <div className="bg-[#90909050] hover:bg-[#5c2489a6] hover:outline hover:outline-2 hover:outline-[#4c4c4c] px-5 py-3 text-[#ffffff] text-lg rounded-lg">
                  <h1>{courseName}</h1>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseMaterialPage;
