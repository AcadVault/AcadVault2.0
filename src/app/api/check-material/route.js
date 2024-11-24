import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb.config";
import { ApprovedMaterial, UnapprovedMaterial } from "@/models/material.model";

export const POST = async (req) => {
    try {
        await connectMongoDB();

        const { courseName, materialType, year, number, exam } = await req.json();

        if (materialType === "Handwritten Notes") {
            return NextResponse.json({
                success: true,
                exists: false,
            });
        }        

        const query = {
            courseName,
            materialType,
            ...(year && { year }),
            ...(exam && { exam }),
        };

        const approvedMaterials = await ApprovedMaterial.find(query);
        const unapprovedMaterials = await UnapprovedMaterial.find(query);

        const isDuplicate = (materials) =>
            materials.some((material) => {
                if (number && material.number) {
                    if (material.number.includes("to")) {
                        const [start, end] = material.number.split("to").map((n) => parseInt(n.trim()));
                        const [numStart, numEnd] = number.split("to").map((n) => parseInt(n.trim()));
                        return numStart >= start && numEnd <= end;
                    }
                    return material.number === number;
                }
                return !number && !material.number;
            });

        if (isDuplicate(approvedMaterials)) {
            return NextResponse.json({
                success: true,
                exists: true,
                type: "APPROVED",
            });
        }

        if (isDuplicate(unapprovedMaterials)) {
            return NextResponse.json({
                success: true,
                exists: true,
                type: "UNAPPROVED",
            });
        }

        return NextResponse.json({
            success: true,
            exists: false,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
};