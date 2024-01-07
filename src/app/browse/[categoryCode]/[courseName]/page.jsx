import { MATERIAL_CATEGORIES } from "@/lib/constants";
import BrowseCard from "@/components/BrowseCard";

const MaterialCategoryListPage = ({ params }) => {
  const categoryCode = params.categoryCode;
  const courseName = decodeURIComponent(params.courseName);

  const materialCategoryList = [];
  for (const key in MATERIAL_CATEGORIES)
    materialCategoryList.push(MATERIAL_CATEGORIES[key]);

  return (
    <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto">
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