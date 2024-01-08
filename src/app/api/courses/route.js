import { NextResponse } from "next/server"
import { Course } from "@/models/course.model";
import { connectMongoDB } from "@/lib/mongodb.config";
import { createFolder } from "@/lib/drive-operations";

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

    await connectMongoDB();
    console.log(filter);
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
    const { courseName, categoryCode } = await request.json();
    await connectMongoDB();
    const _course = await Course.findOne({ courseName });
    if (_course) {
      return NextResponse.json({ success: false, error: 'Course already exists' }, { status: 400 })
    }

    const { id } = await createFolder(courseName, 'Materials');
    const folderID = id;
    const course = new Course({ courseName, folderID, categoryCode });
    await course.save();
    return NextResponse.json({ success: true, data: course })
  }
  catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
