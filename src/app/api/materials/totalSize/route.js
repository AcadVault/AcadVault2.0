import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb.config";
import { ApprovedMaterial } from "@/models/material.model";
import { getTotalSizeFromFileIDs, formatSize } from "@/lib/drive-operations";

const BATCH_SIZE = 5;

async function getTotalSizeInBatches(fileIDs) {
    let totalSize = 0;

    for (let i = 0; i < fileIDs.length; i += BATCH_SIZE) {
        const batch = fileIDs.slice(i, i + BATCH_SIZE);
        totalSize += await getTotalSizeFromFileIDs(batch);
    }

    return totalSize;
}

export const GET = async (req) => {
    try {
        const { searchParams } = req.nextUrl;
        await connectMongoDB();
        const materials = await ApprovedMaterial.find({}, { fileID: 1 });
        const fileIDs = materials.map((material) => material.fileID);

        if (fileIDs.length === 0) {
            return NextResponse.json({ success: true, totalSize: "0 Bytes" });
        }

        const totalSizeInBytes = await getTotalSizeInBatches(fileIDs);
        const formattedSize = formatSize(totalSizeInBytes);

        return NextResponse.json({ success: true, totalSize: formattedSize });
    } catch (error) {
        console.error("Error calculating total size:", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
};