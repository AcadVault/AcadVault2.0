"use client";

import RequestCard from "@/components/(requests)/RequestCard";
import { useState, useEffect } from "react";
import Loading from "@/components/(layout)/Loading";
import NothingHere from "@/components/(layout)/NothingHere";

function RequestsPage() {
    const [cardData, setCardData] = useState(null);

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await fetch("/api/requests");
                const dataJson = await response.json();
                if (dataJson.success) setCardData(dataJson.data);
                else throw new Error(dataJson.error);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchCardData();
    }, []);

    if (cardData === null) return <Loading />;
    if (cardData.length === 0) return <NothingHere />;

    return (
        <div className="w-11/12 sm:w-4/5 md:w-[78%] mx-auto my-10">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {cardData.map((request, index) => (
                    <RequestCard data={request} key={index} />
                ))}
            </div>
        </div>
    );
}

export default RequestsPage;