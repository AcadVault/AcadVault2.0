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

    return (contributors.map((contributor, index) => (<div key={index} className='p-4 bg-neutral-950 hover:bg-neutral-950 border border-gray-300 rounded-lg text-center'>{contributor}</div>)));
};

export default DriveContributors;