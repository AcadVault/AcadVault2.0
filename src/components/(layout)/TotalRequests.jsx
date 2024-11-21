"use client";

import { useState, useEffect } from "react";

const TotalRequests = () => {
    const [Requested, setRequested] = useState(0);
    const [Rejected, setRejected] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/requests");
            const data = await response.json();
            if (data.success) {
                setRequested(data.data.filter(item => item.status === "REQUESTED").length);
                setRejected(data.data.filter(item => item.status === "REJECTED").length);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <span>| Requested: {Requested} | Rejected: {Rejected}</span>
    );
};

export default TotalRequests;