"use client";
import { formatDate } from "@/lib/client-helper-functions";
import { CheckCircle } from "lucide-react";

const MaterialCard = ({ data }) => {
    const formattedDate = formatDate(data.createdAt);

    return (
        <div className="w-full my-3 border-b border-t transition ease-in-out duration-300 p-3 text-[#ffffff]">
            <div className="mb-4">
                <div className="text-black font-semibold">{data.courseName}</div>
                <div className="text-gray-500 text-sm">{data.materialType}</div>
            </div>
            <div className="mb-4">
                {data.referenceBookName && (
                    <div className="flex text-sm">
                        <div className="text-black">Book Name:</div>
                        <div className="text-gray-500 ml-1 break-words overflow-hidden">{data.referenceBookName}</div>
                    </div>
                )}
                {data.exam && (
                    <div className="flex text-sm">
                        <div className="text-black">Exam:</div>
                        <div className="text-gray-500 ml-1 break-words overflow-hidden1">{data.exam}</div>
                    </div>
                )}
                {data.number && (
                    <div className="flex text-sm">
                        <div className="text-black">Assignment:</div>
                        <div className="text-gray-500 ml-1 break-words overflow-hidden1">{data.number}</div>
                    </div>
                )}
                {data.year && (
                    <div className="flex text-sm">
                        <div className="text-black">Year</div>
                        <div className="text-gray-500 ml-1 break-words overflow-hidden1">{data.year}</div>
                    </div>
                )}
            </div>
            {data.approvedBy && (
                <div className="flex items-center gap-1 text-gray-500 text-sm"><CheckCircle className="size-4" stroke="#6370ff" /> {`Approved on ${formattedDate}`}</div>
            )}
        </div>
    );
};

export default MaterialCard;