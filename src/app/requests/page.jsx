"use client";

import RequestCard from "@/components/RequestCard";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import NothingHere from "@/components/NothingHere";

function RequestsPage() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/requests");
      const data = await response.json();
      if(data.success) setData(data.data);
      else throw new Error(data.error);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (data === null) return <Loading />;
  if (data.length === 0) return <NothingHere />;

  return (
    <div className="w-11/12 sm:w-4/5 md:w-[78%] mx-auto my-10">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {data.map((request, index) => (
          <RequestCard data={request} key={index} />
        ))}
      </div>
    </div>
  );
}

export default RequestsPage;
