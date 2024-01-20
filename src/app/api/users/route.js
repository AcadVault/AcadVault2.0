import { NextResponse } from "next/server";
import { User } from '@/models/user.model';
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async (req) => {
  try {
    const url = req.nextUrl;
    console.log(url);
    await connectMongoDB();
    const users = await User.find().count();
    return NextResponse.json({ success: true, data: users });
  } catch (err) {
    console.error("Error: ", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
};
