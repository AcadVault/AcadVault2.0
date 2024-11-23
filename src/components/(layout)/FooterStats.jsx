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
            const materialSizeResponse = await fetch("/api/materials/totalSize");
            const usersData = await usersResponse.json();
            const materialData = await materialResponse.json();
            const materialSizeData = await materialSizeResponse.json();

            if (usersData.success) setTotalUsers(usersData.data);
            if (materialData.success) setTotalMaterials(materialData.data.filter(item => item.status === "APPROVED").length);
            if (materialSizeData.success) setTotalMaterialsSize(materialSizeData.totalSize);

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
        <span>Total Users: {totalUsers} | Total Materials: {totalMaterials} | Total Materials Size: {totalMaterialsSize} </span>
    );
};

export default FooterStats;