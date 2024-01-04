"use client";

import RequestCard from "@/components/RequestCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function RequestsPage() {
  const [data, setData] = useState([]);
  const session = useSession();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/requests");
      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="left-0 top-0 -z-10 h-full w-full">
      {data.map((request, index) => (
        <RequestCard
          data={request}
          currentUser={session.data.user}
          key={index}
        />
      ))}
    </div>
  );
}

export default RequestsPage;
