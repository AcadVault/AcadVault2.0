"use client";

import { formatDate, openFile } from "@/lib/client-helper-functions";

const UserFileCard = ({ file }) => {
    const formattedDate = formatDate(file.createdAt);
    const handleOpenFile = async () => {
        openFile(file.fileID);
    };

    return (
        <div className="w-full my-2 bg-white bg-opacity-5 backdrop-filter backdrop-blur-sm outline outline-1 outline-gray-500 rounded-lg p-3 text-[#ffffff]">
            <div className="flex">
                <div className="text-gray-500">Course</div>
                <div className="text-gray-200 ml-1">{file.courseName}</div>
            </div>
            <div className="flex">
                <div className="text-gray-500">Material Type</div>
                <div className="text-gray-200 ml-1">{file.materialType}</div>
            </div>
            {file.referenceBookName && (
                <div className="flex">
                    <div className="text-gray-500 whitespace-nowrap">Book Name</div>
                    <div className="text-gray-200 ml-1 break-words overflow-hidden">{file.referenceBookName}</div>
                </div>
            )}
            {file.exam && (
                <div className="flex">
                    <div className="text-gray-500">Exam</div>
                    <div className="text-gray-200 ml-1">{file.exam}</div>
                </div>
            )}
            {file.number && (
                <div className="flex">
                    <div className="text-gray-500">Assignment No.</div>
                    <div className="text-gray-200 ml-1">{file.number}</div>
                </div>
            )}
            {file.year && (
                <div className="flex">
                    <div className="text-gray-500">Year</div>
                    <div className="text-gray-200 ml-1">{file.year}</div>
                </div>
            )}
            <div className="flex justify-between mt-2 align-bottom">
                <button onClick={handleOpenFile} className="bg-[#461f60] hover:bg-[#6c4387] text-white py-1 px-4 rounded">Open File</button>
                <div className="flex items-center gap-1 text-gray-500 text-sm"><span>Uploaded on {formattedDate}</span></div>
            </div>
        </div>
    );
};

export default UserFileCard;