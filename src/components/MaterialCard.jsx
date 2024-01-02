const MaterialCard = ({ data }) => {

  return (
    <div className="w-11/12 mx-auto my-4 border border-gray-500 rounded-xl p-2 text-white backdrop backdrop-blur-sm bg-black bg-opacity-10 relative">
      <div className="flex flex-row">
        <div className="text-gray-500">Course </div>
        <div className="text-gray-200 ml-1">{data.courseName}</div>
      </div>
      <div className="flex flex-row">
        <div className="text-gray-500">Material type </div>
        <div className="text-gray-200 ml-1">{data.materialType}</div>
      </div>
      <div className="flex flex-row">
        <div className="text-gray-500">Year </div>
        <div className="text-gray-200 ml-1">{data.year}</div>
      </div>
    </div>
  )
};

export default MaterialCard;
