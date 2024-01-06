import { MATERIAL_CATEGORIES } from "@/lib/constants";

const page = ({ params }) => {
  const courseName = decodeURIComponent(params.courseName);
  const materialCategoryList = [];
  for (const key in MATERIAL_CATEGORIES)
    materialCategoryList.push(MATERIAL_CATEGORIES[key]);

  return (
    <div className="left-0 top-0 -z-10 h-full w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row mx-auto w-11/12 sm:w-4/5 md:w-2/3 gap-4 mt-10">
        {materialCategoryList.map((category, index) => {
          return (
            <a key={index} href={`/browse/${courseName}/${category}`} className="bg-[rgb(246,245,245)] bg-opacity-5 backdrop-filter backdrop-blur-sm hover:outline rounded-lg transition ease-in-out duration-300 p-5 text-[#ffffff] text-lg hover:outline-2 hover:outline-gray-50 hover:bg-opacity-10 transform hover:-translate-y-1 text-center" >
              {category}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default page;
