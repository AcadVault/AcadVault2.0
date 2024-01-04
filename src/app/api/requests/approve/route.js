import { ApprovedMaterial, UnapprovedMaterial } from "@/models/material.model";
import { Request as MaterialRequest } from "@/models/request.model";
import { NextResponse } from "next/server";
import { moveFile } from "@/lib/drive-operations";
import { connectMongoDB } from "@/lib/mongodb.config";

export const POST = async (req) => {
  const { requestID, approverID } = await req.json();

  try {
    await connectMongoDB('catalogue');

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
