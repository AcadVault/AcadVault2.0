import { NextResponse } from "next/server"
import { Course } from "@/models/course.model";
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async (request) => {
  try {
    const { searchParams } = request.nextUrl;
    let courseName = searchParams.get('courseName');
    if (courseName === "*") courseName = null;
    const categoryCode = searchParams.get('categoryCode');

    const filter = { courseName, categoryCode };
    for (let key in filter) {
      if (!filter[key]) {
        delete filter[key];
      }
    }

    await connectMongoDB('catalogue');
    const data = await Course.find(filter).sort({ courseName: 1 });
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
