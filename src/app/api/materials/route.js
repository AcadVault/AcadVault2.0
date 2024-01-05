import { NextResponse } from 'next/server';
import { ApprovedMaterial } from '@/models/material.model';
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async (request) => {
  try {
    const { searchParams } = request.nextUrl;
    const courseName = searchParams.get('courseName');
    const materialType = searchParams.get('materialType');
    const exam = searchParams.get('exam');
    const year = searchParams.get('year');

    const filterObject = { courseName, materialType, exam, year };
    for (let key in filterObject) {
      if (!filterObject[key]) {
        delete filterObject[key];
      }
    }
    await connectMongoDB('catalogue');
    const data = await ApprovedMaterial.find(filterObject);
    return NextResponse.json({ success: true, data })
  }
  catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}