import { ApprovedMaterial, UnapprovedMaterial } from "@/models/material.model";
import { Request as MaterialRequest } from "@/models/request.model";
import { NextResponse } from "next/server";
import { moveFile } from "@/lib/drive-operations";
import { connectMongoDB } from "@/lib/mongodb.config";

export const PUT = async (req) => {
  const { requestID } = await req.json();

  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not found');
    const approverID = user.id;
    if (!isResourceManager(approverID)) throw new Error('User not authorized');

    await connectMongoDB('catalogue');

    const materialRequest = await MaterialRequest.findOne({ _id: requestID });
    if (!materialRequest) {
      return NextResponse.json({ success: false, error: 'Request not found' });
    }

    if (materialRequest.status === 'APPROVED') {
      const oldMaterial = await ApprovedMaterial.findByIdAndDelete(materialRequest.material);
      const { fileID, courseName, materialType, exam, number, year, referenceBookName } = oldMaterial;
      const material = new UnapprovedMaterial({ fileID, courseName, materialType, exam, number, year, referenceBookName });
      await material.save();
      await moveFile(material.fileID, material.courseName, 'Requests');
      materialRequest.material = material._id;
    }

    materialRequest.status = 'REJECTED';
    await materialRequest.save();
    await materialRequest.populate('material');
    return NextResponse.json({ success: true, data: materialRequest });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
