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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-11/12 sm:w-4/5 md:w-3/4 mx-auto my-10">
      {data.map((request, index) => (
        <RequestCard data={request} currentUser={session.data.user} key={index} />
      ))}
    </div>
  );
}

export default RequestsPage;
