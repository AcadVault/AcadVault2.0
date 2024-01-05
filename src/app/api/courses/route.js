import { NextResponse } from "next/server"
import { Course } from "@/models/course.model";
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const courseName = searchParams.get('courseName');
    if (!courseName) throw { message: "courseName isn't provided" }

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
    const { courseName, folderID } = await request.json();

    await connectMongoDB('catalogue');
    const course = new Course({ courseName, folderID });
    await course.save();
    return NextResponse.json({ success: true, data: course })
  }
  catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
