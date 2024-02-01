"use client";

import { useState, useEffect } from "react";

const TotalRequests = () => {
    const [Approved, setApproved] = useState(0);
    const [Requested, setRequested] = useState(0);
    const [Rejected, setRejected] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/requests");
            const data = await response.json();
            if (data.success) {
                setApproved(data.data.filter(item => item.status === "APPROVED").length);
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
        <span>
            | Approved Requests: {Approved} | Requested: {Requested} | Rejected: {Rejected}
        </span>
    );
};

export default TotalRequests;
