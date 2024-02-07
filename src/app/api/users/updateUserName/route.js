import { NextResponse } from "next/server";
import { User } from '@/models/user.model';
import { connectMongoDB } from "@/lib/mongodb.config";

export const POST = async (req) => {
  try {
    const { email, username } = req.body;
    await connectMongoDB();
    const userDatabase = await User.findOne({ email: email });

    if (!userDatabase) {
      return NextResponse.json({ success: false, error: 'User not found in the DB' });
    }

    userDatabase.name = username;
    const updatedUser = await userDatabase.save();

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (err) {
    console.error("Error: ", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
};
