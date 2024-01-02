import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
  return NextResponse.json({ success: true, data: {} })
}

export const POST = async (req) => {

}