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
    <div className="w-11/12 mx-auto my-3 border border-gray-500 rounded-xl p-2 text-white backdrop backdrop-blur-sm bg-black bg-opacity-50 relative">
      <div className="flex">
        <div className="text-gray-500">Course</div>
        <div className="text-gray-200 ml-1">{data.courseName}</div>
      </div>
      <div className="flex">
        <div className="text-gray-500">Material type</div>
        <div className="text-gray-200 ml-1">{data.materialType}</div>
      </div>
      {data.referenceBookName && (
        <div className="flex">
          <div className="text-gray-500 whitespace-nowrap">Book name</div>
          <div className="text-gray-200 ml-1">{data.referenceBookName}</div>
        </div>
      )}
      {data.exam && (
        <div className="flex">
          <div className="text-gray-500">Exam</div>
          <div className="text-gray-200 ml-1">{data.exam}</div>
        </div>
      )}
      {data.number && (
        <div className="flex">
          <div className="text-gray-500">Assignment no.</div>
          <div className="text-gray-200 ml-1">{data.number}</div>
        </div>
      )}
      {data.year && (
        <div className="flex">
          <div className="text-gray-500">Year</div>
          <div className="text-gray-200 ml-1">{data.year}</div>
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
