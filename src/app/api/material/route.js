import { NextRequest, NextResponse } from "next/server"
import { uploadFile, searchFolder, createFolder } from "@/lib/drive-operations"

export const GET = async () => {
  return NextResponse.json({ success: true, data: {} })
}

export const POST = async (request) => {
  try {
    const formData = await request.formData()
    const courseName = formData.get('courseName');
    const fileObject = formData.get('file');
    console.log(courseName, fileObject);
    const data = await uploadFile(fileObject, courseName);
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message })
  }
}