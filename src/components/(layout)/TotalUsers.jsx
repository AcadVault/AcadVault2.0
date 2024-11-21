"use client";

import { useState, useEffect } from "react";

const TotalUsers = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalMaterials, setTotalMaterials] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/users/");
            const materialResponse = await fetch("/api/requests/");
            const data = await response.json();
            const materialData = await materialResponse.json();
            if (data.success) setTotalUsers(data.data);
            if (materialData.success) setTotalMaterials(materialData.data.filter(item => item.status === "APPROVED").length);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <span>Total Users: {totalUsers} | Total Materials: {totalMaterials} {""}</span>
    );
};

export default TotalUsers;