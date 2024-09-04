import Image from "next/image";

const ContributorCard = ({ data }) => (
    <div key={data.name} className="p-4 bg-[rgb(246,245,245)] bg-opacity-5 backdrop-filter backdrop-blur-sm outline outline-1 outline-gray-500 rounded-lg text-[#ffffff] text-center">
        <h2 className="text-lg font-semibold">{data.name}</h2>
        <p className="text-gray-500">{data.batch}</p>
        <div className="flex justify-center mt-3">
            <a target="_blank" href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${data.email}&su=AcadVault&body=AcadVault%20material%20query.`}>{data.email}</a>
        </div>
    </div>
);

export default ContributorCard;