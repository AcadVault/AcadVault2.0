import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb.config"
import { User } from "@/models/user.model";

export const GET = async () => {
  try {
    await connectMongoDB('nextauth');
    const allUsers = await User.find({});
    return NextResponse.json({ success: true, data: allUsers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}