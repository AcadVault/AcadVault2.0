import Image from 'next/image';

const CollaboratorCard = ({ data }) => (
    <div key={data.login} className="p-4 bg-[rgb(246,245,245)] bg-opacity-5 backdrop-filter backdrop-blur-sm outline outline-1 outline-gray-500 rounded-lg text-[#ffffff] text-center">
        <Image src={data.avatar_url} width={100} height={100} alt={data.name} priority={true} className="max-w-[32] max-h-[32] w-32 h-32 rounded-full mx-auto mb-5" />
        <h2 className="text-lg font-semibold text-blue-500"><a href={data.html_url} target='_blank'>{data.login}</a></h2>
    </div>
);

export default CollaboratorCard;