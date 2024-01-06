"use client";
import { formatDate, openFile } from "@/lib/client-helper-functions";
import { GoVerified } from "react-icons/go";

const MaterialCard = ({ data }) => {
  const formattedDate = formatDate(data.createdAt);
  const handleOpenFile = async () => {
    openFile(data.fileID);
  };

  return (
    <div className="w-11/12 mx-auto my-3 bg-[rgb(0,0,0)] bg-opacity-25 backdrop-filter backdrop-blur-sm outline outline-1 outline-gray-500 rounded-lg transition ease-in-out duration-300 p-3 text-[#ffffff]">
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
          <div className="text-gray-200 ml-1 break-words overflow-hidden">
            {data.referenceBookName}
          </div>
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
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <span>
                <GoVerified
                  className="w-4 h-4"
                  stroke-width="1.5"
                  stroke="#6370ff"
                />
              </span>
              <span>{`Approved on ${formattedDate}`}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialCard;
