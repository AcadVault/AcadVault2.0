import Image from "next/image";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const ContributorCard = ({ data }) => {
  return (
    <div
      key={data.name}
      className="p-4 bg-[rgb(246,245,245)] bg-opacity-5 backdrop-filter backdrop-blur-sm outline outline-1 outline-gray-500 rounded-lg text-[#ffffff] text-center"
    >
      <Image
        src={data.pfp}
        width={100}
        height={100}
        alt={data.name}
        priority={true}
        className="max-w-[32] max-h-[32] w-32 h-32 rounded-full mx-auto mb-5"
      />
      <h2 className="text-lg font-semibold">{data.name}</h2>
      <p className="text-gray-500">{data.batch}</p>
      <div className="flex justify-center mt-3">
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:scale-110 hover:text-[#0e76a8]"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:scale-110 hover:text-[#211F1F]"
        >
          <FaGithub size={24} />
        </a>
        <a
          href={data.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:scale-110 hover:text-[#1DA1F2]"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href={data.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:scale-110 hover:text-[#C13584]"
        >
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
};

export default ContributorCard;
