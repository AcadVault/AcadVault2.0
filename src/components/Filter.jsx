"use client";

import { useState } from "react";
const Filter = ({ filter, setFilter }) => {
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFilter({ ...filter, [id]: checked });
  };

  return (
    <div className="flex text-white justify-between">
      <div>
        <input
          type="text"
          onChange={(e) => {
            setFilter({ ...filter, courseName: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="exam"
          value="exam"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="exam">Exam</label>

        <input
          type="checkbox"
          id="assignment"
          value="assignment"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="assignment">Assignment</label>

        <input
          type="checkbox"
          id="referenceBook"
          value="assignment"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="referenceBook">Reference Book</label>
      </div>
    </div>
  );
};

export default Filter;
