import { MATERIAL_CATEGORIES } from "@/lib/constants";

const page = ({ params }) => {
  const courseName = decodeURIComponent(params.courseName);
  return (
    <div className="w-2/3 mx-auto">
      {/* {MATERIAL_CATEGORIES.map((category, index) => {
        return (
          <a
            key={index}
            href={`/browse/${courseName}/${category}`}
            className="px-5 py-5 my-2 bg-[#ffffff] bg-opacity-25 hover:bg-opacity-40 font-bold text-white rounded-xl"
          >
            {category}
          </a>
        );
      })} */}
    </div>
  );
};

export default page;
