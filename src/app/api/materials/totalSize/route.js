import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb.config";
import { ApprovedMaterial } from "@/models/material.model";
import { getTotalSizeFromFileIDs, formatSize } from "@/lib/drive-operations";

export const GET = async () => {
    try {
        await connectMongoDB();

        const materials = await ApprovedMaterial.find({}, { fileID: 1 });
        const fileIDs = materials.map((material) => material.fileID);

        if (fileIDs.length === 0) {
            return NextResponse.json({ success: true, totalSize: "0 Bytes" });
        }

        const totalSizeInBytes = await getTotalSizeFromFileIDs(fileIDs);
        const formattedSize = formatSize(totalSizeInBytes);

        return NextResponse.json({ success: true, totalSize: formattedSize });
    } catch (error) {
        console.error("Error calculating total size:", error.message);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
};