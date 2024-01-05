"use client";

import Filter from "@/components/Filter";
import { useState } from "react";

const BrowseMaterialLayout = ({ children }) => {
  const [filter, setFilter] = useState({
    courseName: "",
    exam: false,
    assignment: false,
    referenceBook: false,
  });

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      {children}
    </div>
  );
};

export default BrowseMaterialLayout;
