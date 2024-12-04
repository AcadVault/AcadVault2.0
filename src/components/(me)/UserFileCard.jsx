"use client";

import { formatDate, openFile } from "@/lib/client-helper-functions";

const UserFileCard = ({ file }) => {
    const formattedDate = formatDate(file.createdAt);
    const handleOpenFile = async () => {
        openFile(file.fileID);
    };

    return (
        <div className="w-full my-3 border rounded-lg transition ease-in-out duration-300 p-3 text-[#ffffff]">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                <div>
                    <div className="mb-4 text-left">
                        <div className="text-black font-semibold">{file.courseName}</div>
                        <div className="text-gray-500 text-sm">{file.materialType}</div>
                    </div>
                    <div className="mb-4">
                        {file.referenceBookName && (
                            <div className="flex text-sm">
                                <div className="text-black">Book Name:</div>
                                <div className="text-gray-500 ml-1 break-words overflow-hidden">{file.referenceBookName}</div>
                            </div>
                        )}
                        {file.exam && (
                            <div className="flex text-sm">
                                <div className="text-black">Exam:</div>
                                <div className="text-gray-500 ml-1 break-words overflow-hidden1">{file.exam}</div>
                            </div>
                        )}
                        {file.number && (
                            <div className="flex text-sm">
                                <div className="text-black">Assignment:</div>
                                <div className="text-gray-500 ml-1 break-words overflow-hidden1">{file.number}</div>
                            </div>
                        )}
                        {file.year && (
                            <div className="flex text-sm">
                                <div className="text-black">Year</div>
                                <div className="text-gray-500 ml-1 break-words overflow-hidden1">{file.year}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 items-center text-sm">
                    <button onClick={handleOpenFile} className="text-white bg-black hover:bg-gray-900 rounded-lg px-3 py-2">Open File</button>
                    <div className="flex items-center gap-1 text-gray-500 text-sm"><span>{formattedDate}</span></div>
                </div>
            </div>
        </div>
    );
};

export default UserFileCard;