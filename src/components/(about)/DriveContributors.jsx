"use client"

import { useState, useEffect } from 'react';

const DriveContributors = () => {
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        fetch("/api/driveContributors")
            .then(res => res.json())
            .then(data => { if (data.success) { setContributors(data.data); } })
            .catch(err => console.error("Error fetching contributors:", err));
    }, []);

    return (contributors.map((contributor, index) => (<div key={index} className='p-4 bg-[rgb(246,245,245)] bg-opacity-5 backdrop-filter backdrop-blur-sm outline outline-1 outline-gray-500 rounded-lg text-center'>{contributor}</div>)));
};

export default DriveContributors;