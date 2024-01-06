import { MATERIAL_CATEGORIES } from "@/lib/constants";
import BrowseCard from "@/components/BrowseCard";

const MaterialCategoryListPage = ({ params }) => {
  const categoryCode = params.categoryCode;
  const courseName = decodeURIComponent(params.courseName);

  const materialCategoryList = [];
  for (const key in MATERIAL_CATEGORIES)
    materialCategoryList.push(MATERIAL_CATEGORIES[key]);

  return (
    <div className="grid grid-flow-row gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
      {materialCategoryList.map((category, index) => {
        return (
          <BrowseCard
            key={index}
            href={`/browse/${categoryCode}/${courseName}/${category}`}
          >
            <div className="card-text-2">{category}</div>
          </BrowseCard>
        );
      })}
    </div>
  );
};

export default MaterialCategoryListPage;
