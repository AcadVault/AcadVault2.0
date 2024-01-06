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
      <div className="grid grid-flow-row gap-3 grid-cols-1 md:grid-cols-2 mx-auto mt-10 w-11/12 sm:w-4/5">
        {allCourses.map(({ courseName }, index) => {
          return (
            <div key={index}>
              <a href={`/browse/${courseName}`}>
                <div className="bg-[rgb(246,245,245)] bg-opacity-5 backdrop-filter backdrop-blur-sm hover:outline rounded-lg transition ease-in-out duration-300 px-5 py-3 text-[#ffffff] text-lg hover:outline-2 hover:outline-gray-50 hover:bg-opacity-10">
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
