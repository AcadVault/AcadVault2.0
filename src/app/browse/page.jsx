"use client";

import BrowseCard from "@/components/BrowseCard";
import { COURSE_CATEGORY_CODES } from "@/lib/constants";

const CourseCategoryListPage = () => {
  const allCategories = COURSE_CATEGORY_CODES;

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto">
      {allCategories.map((categoryCode, index) => {
        return (
          <BrowseCard key={index} href={`/browse/${categoryCode}`}>
            <div className="card-text-0">{categoryCode}</div>
          </BrowseCard>
        );
      })}
    </div>
  );
};

export default CourseCategoryListPage;
