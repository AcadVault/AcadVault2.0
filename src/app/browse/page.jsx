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
    <div>
      <div className="grid grid-flow-row grid-cols-2 mx-auto w-2/3">
        {allCourses.map(({ courseName }, index) => {
          return (
            <div key={index}>
              <a href={`/browse/${courseName}`}>
                <div className="bg-[#c45fff50] mx-2 my-1 hover:bg-[#c96bffbd] px-5 py-3 text-[#ffffff] text-lg rounded-lg">
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
