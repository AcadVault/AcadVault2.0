import { ApprovedMaterial, UnapprovedMaterial } from "@/models/material.model";
import { Request as MaterialRequest } from "@/models/request.model";
import { NextResponse } from "next/server";
import { moveFile } from "@/lib/drive-operations";
import { connectMongoDB } from "@/lib/mongodb.config";
import { getCurrentUser, isResourceManager } from "@/lib/server-helper-functions";

export const PUT = async (req) => {
    const { requestID } = await req.json();

    try {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not found');
        const approverID = user.id;
        if (!isResourceManager(approverID)) throw new Error('User not authorized');
        await connectMongoDB();

        const materialRequest = await MaterialRequest.findOne({ _id: requestID });
        if (!materialRequest) {
            return NextResponse.json({ success: false, error: 'Request not found' });
        }

        const oldMaterial = await UnapprovedMaterial.findByIdAndDelete(materialRequest.material);
        const { fileID, courseName, materialType, exam, number, year, referenceBookName } = oldMaterial;
        const material = new ApprovedMaterial({ fileID, courseName, materialType, exam, number, year, referenceBookName });
        material.approvedBy = approverID;
        await material.save();

        materialRequest.status = 'APPROVED';
        materialRequest.material = material._id;
        await materialRequest.save();
        await materialRequest.populate('material');

        await moveFile(material.fileID, 'Requests', material.courseName);
        
        return NextResponse.json({ success: true, data: materialRequest });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}