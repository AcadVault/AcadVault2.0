import "./globals.css";

export const metadata = {
  description: "Browse through the academic resources",
};

const BrowseMaterialLayout = ({ children }) => {
  return <div className="w-11/12 sm:w-4/5 md:w-3/4 xl:w-2/3 mx-auto my-10">{children}</div>;
};

export default BrowseMaterialLayout;
