import { NextRequest, NextResponse } from "next/server"
import { uploadFile, searchFolder, createFolder } from "@/lib/drive-operations"

export const GET = async () => {
  return NextResponse.json({ success: true, data: {} })
}

