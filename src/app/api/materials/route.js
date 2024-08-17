import { NextResponse } from 'next/server';
import { ApprovedMaterial } from '@/models/material.model';
import { connectMongoDB } from "@/lib/mongodb.config";
import { MATERIAL_TYPES, MATERIAL_CATEGORIES } from '@/lib/constants';

export const GET = async (request) => {
    try {
        const { searchParams } = request.nextUrl;
        const courseName = searchParams.get('courseName');
        let materialType = searchParams.get('materialType');
        const exam = searchParams.get('exam');
        const year = searchParams.get('year');

        const materialCategory = searchParams.get('materialCategory');
        if (materialCategory === MATERIAL_CATEGORIES.EXAMS) {
            materialType = { $in: [MATERIAL_TYPES.EXAM_QUESTION_PAPER, MATERIAL_TYPES.EXAM_PAPER_SOLUTION] };
        } else if (materialCategory === MATERIAL_CATEGORIES.ASSIGNMENTS) {
            materialType = { $in: [MATERIAL_TYPES.ASSIGNMENT_QUESTIONS, MATERIAL_TYPES.ASSIGNMENT_SOLUTION] };
        } else if (materialCategory === MATERIAL_CATEGORIES.LECTURES) {
            materialType = { $in: [MATERIAL_TYPES.LECTURE_SLIDES, MATERIAL_TYPES.HANDWRITTEN_NOTES] };
        } else if (materialCategory === MATERIAL_CATEGORIES.REFERENCE_BOOKS) {
            materialType = MATERIAL_TYPES.REFERENCE_BOOK;
        }

        const filterObject = { courseName, materialType, exam, year };
        for (let key in filterObject) {
            if (!filterObject[key]) {
                delete filterObject[key];
            }
        }
        await connectMongoDB();
        const data = await ApprovedMaterial.find(filterObject);
        return NextResponse.json({ success: true, data })
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({ success: false, error: e.message }, { status: 500 })
    }
}