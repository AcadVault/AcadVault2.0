import { NextResponse } from "next/server";
import { generateFilename, getExtention } from "@/lib/server-helper-functions";
import { uploadFile } from "@/lib/drive-operations";
import { Material } from "@/models/material.model";
import { Request as MaterialRequest } from "@/models/request.model";
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async (req) => {
  try {
    await connectMongoDB('catalogue');
    const requests = await MaterialRequest.find({});
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
    const requestTime = new Date();

    const data = { studentID, courseName, materialType, year, number, exam, referenceBookName, file, requestTime };
    const fileName = `${generateFilename(data)}.${getExtention(file.name)}`;

    const { id, webViewLink } = await uploadFile(file, 'Requests', fileName);
    const fileID = id;

    await connectMongoDB('catalogue');
    const material = new Material({ fileID, courseName, materialType, exam, number, year, referenceBookName });
    const request = new MaterialRequest({ material, studentID, requestTime, status: "REQUESTED" })
    await request.save();
    return NextResponse.json({ success: true, data: { ...data, fileID, fileName, webViewLink } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message })
  }
}