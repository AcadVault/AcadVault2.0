const BrowseCard = ({ children, href, isSquare = true }) => (
    <a href={href}>
        <div className={isSquare ? "aspect-square h-full" : "h-full"}>
            <div className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center justify-center w-full h-full text-center text-blue-600 overflow-hidden max-w-[100%] hover:bg-opacity-10 hover:scale-105 transition ease-linear cursor-pointer">
                {children}
            </div>
        </div>
    </a>
);

export default BrowseCard;