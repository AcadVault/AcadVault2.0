import { NextResponse } from "next/server";
import { generateFilename, getExtention } from "@/lib/server-helper-functions";
import { uploadFile } from "@/lib/drive-operations";
import { UnapprovedMaterial, ApprovedMaterial } from "@/models/material.model";
import { Request as MaterialRequest } from "@/models/request.model";
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async () => {
  try {
    await connectMongoDB('catalogue');
    const requests = await MaterialRequest.find({}).populate('material');
    return NextResponse.json({ success: true, data: requests })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message })
  }
}

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const studentID = formData.get('studentID');
    const courseName = formData.get('otherCourseName') || formData.get('courseName');
    const materialType = formData.get('materialType');
    const file = formData.get('file');

    const year = formData.get('year') || undefined;
    const number = formData.get('number') || undefined;
    const exam = formData.get('exam') || undefined;
    const referenceBookName = formData.get('referenceBookName') || undefined;

    const data = { studentID, courseName, materialType, year, number, exam, referenceBookName, file };
    const fileName = `${generateFilename(data)}.${getExtention(file.name)}`;

    const { id, webViewLink } = await uploadFile(file, 'Requests', fileName);
    const fileID = id;

    await connectMongoDB('catalogue');
    const material = new UnapprovedMaterial({ fileID, courseName, materialType, exam, number, year, referenceBookName });
    await material.save();
    const request = new MaterialRequest({ material: material._id, studentID, status: "REQUESTED" })
    await request.save();
    return NextResponse.json({ success: true, data: { ...data, fileID, fileName, webViewLink } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message })
  }
}