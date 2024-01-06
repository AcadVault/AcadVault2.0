"use client";

import MaterialCard from "@/components/MaterialCard";
import { formatDate } from "@/lib/client-helper-functions";
import { useState } from "react";
import toast from "react-hot-toast";

const RequestCard = (props) => {
  const [data, setData] = useState(props.data);

  const formattedRequestTime = formatDate(data.createdAt);
  const [isProcessing, setIsProcessing] = useState(false);

  let statusColor = "#0000";
  if (data.status === "REQUESTED") {
    statusColor = "#FFA500";
  } else if (data.status === "REJECTED") {
    statusColor = "#FF0000";
  } else if (data.status === "APPROVED") {
    statusColor = "#00FF00";
  }

  const approveRequest = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch("/api/requests/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestID: data._id,
          approverID: props.currentUser.email.split("@")[0],
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
  const rejectRequest = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch("/api/requests/reject", {
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

  const handleApprove = async () => {
    toast.promise(
      approveRequest(),
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
      rejectRequest(),
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
    <div className="text-xs md:text-base border border-gray-500 rounded-xl p-4 text-white backdrop backdrop-blur-sm bg-white bg-opacity-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="text-gray-500">Submitted by </div>
          <div className="text-gray-200 ml-1">{data.studentID}</div>
        </div>
        <div
          className="border p-2 rounded-md font-bold"
          style={{ borderColor: statusColor }}
        >
          <div className="ml-1" style={{ color: statusColor }}>
            {data.status}
          </div>
        </div>
      </div>
      <MaterialCard data={data.material} />
      <div className="flex justify-between justify-items-end flex-row-reverse">
        <div className="flex flex-col justify-end">
          <div className="text-gray-500">Posted on {formattedRequestTime}</div>
        </div>
        <div>
          {data.status !== "APPROVED" && (
            <button
              onClick={handleApprove}
              className="bg-[#39b03f] hover:bg-[#60e162] text-white font-semibold py-1.5 px-4 ml-3 rounded disabled:bg-opacity-50 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              Approve
            </button>
          )}
          {data.status !== "REJECTED" && (
            <button
              onClick={handleReject}
              className="bg-[#da3636] hover:bg-[#ff6262] text-white font-semibold py-1.5 px-4 ml-3 rounded disabled:bg-opacity-50 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
