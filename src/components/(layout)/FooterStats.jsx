"use client";

import { useState, useEffect } from "react";

const FooterStats = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalMaterials, setTotalMaterials] = useState(0);
    const [totalMaterialsSize, setTotalMaterialsSize] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const usersResponse = await fetch("/api/users/");
            const materialResponse = await fetch("/api/requests/");
            const usersData = await usersResponse.json();
            const materialData = await materialResponse.json();

            if (usersData.success) setTotalUsers(usersData.data);
            if (materialData.success) setTotalMaterials(materialData.data.filter(item => item.status === "APPROVED").length);

            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    },);

    if (loading) {
        return <span>Loading... </span>;
    }

    return (
        <>
            <div className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">{totalUsers}</div>
                <div className="text-gray-600">Total Users</div>
            </div>
            <div className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">{totalMaterials}</div>
                <div className="text-gray-600">Total Materials</div>
            </div>
        </>
    );
};

export default FooterStats;