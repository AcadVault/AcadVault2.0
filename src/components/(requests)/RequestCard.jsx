"use client";

import MaterialCard from "@/components/(requests)/MaterialCard";
import { useState } from "react";
import { openFile } from "@/lib/client-helper-functions";
import { Trash2, XCircle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const statusColors = {
    REQUESTED: "#FFA500",
    REJECTED: "#FA0210",
    APPROVED: "#00FF00",
};

const RequestCard = (props) => {
    const [data, setData] = useState(props.data);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleOpenFile = async () => {
        openFile(data.fileID);
    };

    const handleRequest = async (operation) => {
        try {
            setIsProcessing(true);
            const response = await fetch(`/api/requests/${operation}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestID: data._id }),
            });

            const res = await response.json();
            if (res.success) {
                setData(res.data);
            } else {
                throw new Error(res.error);
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsProcessing(true);
            toast.loading("Deleting...");
            const response = await fetch(`/api/requests/delete`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestID: data._id }),
            });

            const res = await response.json();
            if (res.success) {
                toast.success("Material request deleted successfully!");
            } else {
                throw new Error(res.error);
            }
        } catch (error) {
            toast.error("Could not delete material request");
            throw error;
        } finally {
            setIsProcessing(false);
            window.location.reload();
        }
    };

    const handleApprove = async () => {
        toast.promise(
            handleRequest("approve"),
            {
                loading: "Approving...",
                success: <b>Material requested approved successfully!</b>,
                error: <b>Could not approve</b>,
            },
            {
                success: {
                    duration: 2000,
                    icon: "👏",
                },
                error: {
                    duration: 2000,
                    icon: "😞",
                },
            }
        );
    };

    const handleReject = async () => {
        toast.promise(
            handleRequest("reject"),
            {
                loading: "Rejecting...",
                success: <b>Material requested rejected successfully!</b>,
                error: <b>Could not reject</b>,
            },
            {
                success: {
                    duration: 2000,
                    icon: "👏",
                },
                error: {
                    duration: 2000,
                    icon: "😞",
                },
            }
        );
    };

    return (
        <div className="text-xs sm:text-sm md:text-base border rounded-lg p-4 bg-white">
            <div className="flex flex-row justify-between items-center text-sm">
                <div className="text-gray-500">Submitted by {data.studentID}</div>
                <div className="border px-2 py-1 rounded-full text-black" style={{ backgroundColor: statusColors[data.status] }}>{data.status}</div>
            </div>
            <MaterialCard data={data.material} />
            <div className="flex justify-between items-stretch mx-2 text-sm">
                <button onClick={handleOpenFile} className="text-white bg-black hover:bg-gray-900 rounded-lg px-5 py-2.5">Open File</button>
                <div className="flex gap-2 h-fit self-center">
                    {data.status !== "APPROVED" && (<button onClick={handleApprove} className="bg-green-500 hover:bg-green-600 p-2 border rounded disabled:bg-opacity-50 disabled:cursor-not-allowed" disabled={isProcessing}><CheckCircle className="size-5"/></button>)}
                    {data.status !== "REJECTED" && (<button onClick={handleReject} className="bg-red-500 hover:bg-red-600 p-2 border rounded disabled:bg-opacity-50 disabled:cursor-not-allowed text-white font-light" disabled={isProcessing}><XCircle className="size-5"/></button>)}
                    <button onClick={handleDelete} className="bg-white hover:bg-gray-100 p-2 border rounded disabled:bg-opacity-50 disabled:cursor-not-allowed" disabled={isProcessing}><Trash2 className="size-5"/></button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;