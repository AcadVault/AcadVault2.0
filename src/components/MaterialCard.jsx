"use client";

const MaterialCard = ({ data }) => {
  const handleOpenFile = async () => {
    try {
      const webViewLink = `https://drive.google.com/file/d/${data.fileID}/view`;
      window.open(webViewLink, "_blank");
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto my-4 border border-gray-500 rounded-xl p-2 text-white backdrop backdrop-blur-sm bg-black bg-opacity-50 relative">
      <div>
        <span className="text-gray-500">Course</span>
        <span className="text-gray-200 ml-1">{data.courseName}</span>
      </div>
      <div>
        <span className="text-gray-500">Material type</span>
        <span className="text-gray-200 ml-1">{data.materialType}</span>
      </div>
      {data.referenceBookName && (
        <div className="flex">
          <span className="text-gray-500 whitespace-nowrap">Book name</span>
          <span className="text-gray-200 ml-1">{data.referenceBookName}</span>
        </div>
      )}
      {data.exam && (
        <div>
          <span className="text-gray-500">Exam</span>
          <span className="text-gray-200 ml-1">{data.exam}</span>
        </div>
      )}
      {data.number && (
        <div>
          <span className="text-gray-500">Assignment no.</span>
          <span className="text-gray-200 ml-1">{data.number}</span>
        </div>
      )}
      {data.year && (
        <div>
          <span className="text-gray-500">Year</span>
          <span className="text-gray-200 ml-1">{data.year}</span>
        </div>
      )}
      <div className="flex justify-between mt-2 align-bottom">
        <button
          onClick={handleOpenFile}
          className="bg-[#461f60] hover:bg-[#6c4387] text-white py-1 px-4 rounded"
        >
          Open File
        </button>
        {data.approvedBy && (
          <div className="flex flex-col justify-end">
            <div className="text-gray-500 text-sm">
              {`✅Approved by ${data.approvedBy}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialCard;
