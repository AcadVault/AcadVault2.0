import { Roboto_Slab } from "next/font/google";

const font = Roboto_Slab({
  subsets: ["latin"],
});
const BrowseCard = ({ children, href, isSquare = true }) => {
  return (
    <a href={href} className={font.className}>
      <div className={isSquare ? "aspect-square" : ""}>
        <div className="flex items-center justify-center w-full h-full text-center bg-white bg-opacity-5 rounded-lg p-7 text-secondary hover:bg-opacity-10 hover:scale-105 transition ease-linear cursor-pointer">
          {children}
        </div>
      </div>
    </a>
  );
};

export default BrowseCard;
