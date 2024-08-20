import { NextResponse } from "next/server";
import { Request } from "@/models/request.model";
import { User } from "@/models/user.model";
import { connectMongoDB } from "@/lib/mongodb.config";

export const GET = async (req) => {
    try {
        await connectMongoDB();
        function deldupe(arr) {
            return [...new Set(arr)];
        };

        const users = await User.find();
        const requests = await Request.find({ status: "APPROVED" });
        const all_students = requests.map((request) => request.studentID);
        const students = deldupe(all_students);
        const studentUsers = users.filter(user => { const emailPrefix = user.email.split('@')[0]; return students.includes(emailPrefix); }).map(user => user.name);

        return NextResponse.json({ success: true, data: studentUsers });
    } catch (err) {
        console.error("Error: ", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};