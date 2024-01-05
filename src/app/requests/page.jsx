"use client";

import RequestCard from "@/components/RequestCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function RequestsPage() {
  const [data, setData] = useState([]);
  const session = useSession();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/requests");
      const { data } = await response.json();
      setData(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="left-0 top-0 -z-10 h-full w-full">
      <div className="w-full h-full mt-10">
        {data.map((request, index) => (
          <RequestCard
            data={request}
            currentUser={session.data.user}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default RequestsPage;
