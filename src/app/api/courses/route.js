import { NextResponse } from "next/server"
import { Course } from "@/models/course.model";
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async (request) => {
  try {
    const { searchParams } = request.nextUrl;
    const courseName = searchParams.get('courseName');
    await connectMongoDB('catalogue');
    if (!courseName) throw { message: "courseName isn't provided" }
    await connectMongoDB('catalogue');
    const data = courseName === "*" ? await Course.find({}).sort({ courseName: 1 }) : await Course.findOne({ courseName });
    return NextResponse.json({ success: true, data })
  }
  catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}

export const POST = async (request) => {
  try {
    const { courseName, folderID, categoryCode } = await request.json();
    await connectMongoDB('catalogue');
    const course = new Course({ courseName, folderID, categoryCode });
    await course.save();
    return NextResponse.json({ success: true, data: course })
  }
  catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
