import { Roboto_Slab } from "next/font/google";

const font = Roboto_Slab({ subsets: ["latin"], });

const BrowseCard = ({ children, href, isSquare = true }) => (
    <a href={href} className={font.className}>
        <div className={isSquare ? "aspect-square h-full" : "h-full"}>
            <div className="flex items-center justify-center w-full h-full text-center bg-white bg-opacity-5 rounded-lg p-3 overflow-hidden max-w-[100%] text-secondary hover:bg-opacity-10 hover:scale-105 transition ease-linear cursor-pointer">
                {children}
            </div>
        </div>
    </a>
);

export default BrowseCard;