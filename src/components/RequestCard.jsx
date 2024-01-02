import MaterialCard from "./MaterialCard"
import { formatDate } from "@/lib/helper-functions"

const RequestCard = ({ data }) => {
  const formattedRequestTime = formatDate(data.requestTime);

  let statusColor = "#0000";
  if (data.status === "REQUESTED") {
    statusColor = "#FFA500";
  } else if (data.status === "REJECTED") {
    statusColor = "#FF0000";
  } else if (data.status === "ACCEPTED") {
    statusColor = "#00FF00";
  }

  return (
    <div className="w-11/12 md:w-4/5 mx-auto my-4 border border-gray-500 rounded-xl p-4 text-white backdrop backdrop-blur-sm bg-black bg-opacity-10 relative">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="text-gray-500">Submitted by </div>
          <div className="text-gray-200 ml-1">{data.studentID}</div>
        </div>
        <div className="border p-2 rounded-md font-bold" style={{ borderColor: statusColor }}>
          <div className="ml-1" style={{ color: statusColor }}> {data.status}</div>
        </div>
      </div>
      <MaterialCard data={data.material} />
      <div className="flex flex-row justify-end">
        <div className="text-gray-500">Posted on {formattedRequestTime}</div>
      </div>
    </div>
  );
};

export default RequestCard
