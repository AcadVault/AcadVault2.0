const ContributorCard = ({ data }) => (
    <div key={data.name} className="p-4 bg-neutral-950 hover:bg-neutral-900 border border-gray-700 rounded-lg text-center">
        <h2 className="text-lg font-semibold">{data.name}</h2>
        <p className="text-gray-400">{data.batch}</p>
        <div className="flex justify-center mt-3">
            <a target="_blank" href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${data.email}&su=AcadVault&body=AcadVault%20material%20query.`}>{data.email}</a>
        </div>
    </div>
);

export default ContributorCard;