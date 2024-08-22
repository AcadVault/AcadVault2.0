import { NextResponse } from 'next/server';
import { ApprovedMaterial } from '@/models/material.model';
import { User } from "@/models/user.model";
import { Request } from "@/models/request.model";
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

        const materials = await ApprovedMaterial.find(filterObject);

        const results = await Promise.all(materials.map(async (material) => {
            const request = await Request.findOne({ material: material._id });
            if (!request) {
                return {
                    ...material.toObject(),
                    uploaderName: 'Unknown',
                };
            }
            const studentID = request.studentID;
            const userEmail = `${studentID}@daiict.ac.in`;
            const user = await User.findOne({ email: userEmail });
            return {
                ...material.toObject(),
                uploaderName: user ? user.name : 'Unknown',
            };
        }));
        return NextResponse.json({ success: true, data: results });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
};