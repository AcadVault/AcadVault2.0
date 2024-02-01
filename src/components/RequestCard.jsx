"use client";

import MaterialCard from "@/components/MaterialCard";
import { formatDate } from "@/lib/client-helper-functions";
import { useState } from "react";
import toast from "react-hot-toast";

const statusColors = {
  REQUESTED: "#FFA500",
  REJECTED: "#FA0210",
  APPROVED: "#00FF00",
};
const RequestCard = (props) => {
  const [data, setData] = useState(props.data);

  const formattedRequestTime = formatDate(data.createdAt);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRequest = async (operation) => {
    try {
      setIsProcessing(true);
      const response = await fetch(`/api/requests/${operation}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestID: data._id,
        }),
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestID: data._id,
        }),
      });

      const res = await response.json();
      if (res.success) {
        toast.success("Material request deleted successfully!");
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      console.error(error.message);
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
    <div className="text-xs sm:text-sm md:text-base border border-gray-500 rounded-xl p-4 text-white backdrop backdrop-blur-sm bg-white bg-opacity-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="text-gray-500">Submitted by </div>
          <div className="text-gray-200 ml-1">{data.studentID}</div>
        </div>
        <div
          className="border p-2 rounded-md font-bold"
          style={{ borderColor: statusColors[data.status] }}
        >
          <div className="ml-1" style={{ color: statusColors[data.status] }}>
            {data.status}
          </div>
        </div>
      </div>
      <MaterialCard data={data.material} />
      <div className="flex justify-between items-stretch flex-row-reverse mx-2">
        <div className="text-gray-500 self-end text-right">
          Posted on {formattedRequestTime}
        </div>
        <div className="flex gap-2 h-fit self-center">
          {data.status !== "APPROVED" && (
            <button
              onClick={handleApprove}
              className="bg-[#39b03f] hover:bg-[#60e162] text-white font-semibold py-1.5 px-4 rounded disabled:bg-opacity-50 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              Approve
            </button>
          )}
          {data.status !== "REJECTED" && (
            <button
              onClick={handleReject}
              className="bg-[#da3636] hover:bg-[#ff6262] text-white font-semibold py-1.5 px-4 rounded disabled:bg-opacity-50 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              Reject
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-[#828282] hover:bg-[#B0B0B0] text-white font-semibold py-1.5 px-4 rounded disabled:bg-opacity-50 disabled:cursor-not-allowed"
            disabled={isProcessing}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
