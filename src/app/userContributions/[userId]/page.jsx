"use client";

import { useEffect, useState } from "react";
import UserContributionsCard from "@/components/(userContributions)/UserContributionsCard";

const UserContributionsPage = ({ params }) => {
    const { userId } = params;
    const email = `${userId}@daiict.ac.in`;
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch(`/api/userContributions?email=${email}`);
                const data = await response.json();
                if (data.success) {
                    setContributions(data.data);
                } else {
                    throw new Error(data.error);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, [email]);

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (error) return <div className="text-center py-5 text-red-500">Error: {error}</div>;
    if (contributions.length === 0) return <div className="text-center py-5">No contributions found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-xl font-semibold mb-5">Material Contributions by {userId}</h1>
            {contributions.map((file) => (
                <UserContributionsCard key={file._id} file={file.material} />
            ))}
        </div>
    );
};

export default UserContributionsPage;