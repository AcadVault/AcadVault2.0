import { Material } from "@/models/material.model";
import { Request as MaterialRequest } from "@/models/request.model";
import { NextResponse } from "next/server";
import { moveFile } from "@/lib/drive-operations";

export const POST = async (req) => {
  const { requestID, approverID } = await req.json();

  try {
    const materialRequest = await MaterialRequest.findOne({ _id: requestID });
    if (!materialRequest) {
      return NextResponse.json({ success: false, error: 'Request not found' });
    }

    const { fileID, courseName, materialType, exam, number, year, referenceBookName } = materialRequest.material;
    const material = new Material({ fileID, courseName, materialType, exam, number, year, referenceBookName });
    material.approvedBy = approverID;

    materialRequest.material.approvedBy = approverID;
    materialRequest.status = 'APPROVED';
    await moveFile(material.fileID, 'Requests', material.courseName);
    await material.save();
    await materialRequest.save();

    return NextResponse.json({ success: true, data: materialRequest });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
