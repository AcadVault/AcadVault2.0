"use client";

import RequestCard from "@/components/RequestCard";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";

function RequestsPage() {
  const [data, setData] = useState([]);

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

  if (data.length === 0) return <Loading />;
  return (
    <div className="grid grid-cols-1 w-5/6 xs:w-3/4 mx-auto gap-5 lg:grid-cols-2 mt-10">
      {data.map((request, index) => (
        <RequestCard data={request} key={index} />
      ))}
    </div>
  );
}

export default RequestsPage;
