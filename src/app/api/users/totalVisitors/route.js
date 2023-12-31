import { NextResponse } from "next/server"
import { User } from '@/models/user.model'
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async () => {
  try {
    await connectMongoDB();
    const usersCount = await User.find().count();
    return NextResponse.json({ success: true, data: usersCount });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}