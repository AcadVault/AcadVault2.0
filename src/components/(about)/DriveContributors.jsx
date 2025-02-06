"use client"

import { useState, useEffect } from 'react';

const DriveContributors = () => {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/driveContributors")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setContributors(data.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching contributors:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className='w-full my-8 text-center'>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 gap-4 p-1 md:p-5 mt-5 mb-10">
            {contributors.map((contributor, index) => (
                <div key={index} className='p-2 bg-neutral-950 hover:bg-neutral-950 border border-gray-300 rounded-lg text-center flex flex-col gap-1'>
                    <div>{contributor.name}</div>
                    <div className='text-sm text-gray-300'>
                        {contributor.uploadCount} {contributor.uploadCount > 1 ? 'contributions' : 'contribution'}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DriveContributors;