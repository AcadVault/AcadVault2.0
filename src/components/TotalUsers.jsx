"use client";

import { useState, useEffect } from "react";

const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/users/");
      const data = await response.json();
      if (data.success) setTotalUsers(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="absolute bottom-0 mb-3 text-sm font-medium text-gray-100 text-center">
      Total Users: {totalUsers}
    </div>
  );
};

export default TotalUsers;
