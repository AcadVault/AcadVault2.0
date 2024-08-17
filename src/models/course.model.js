import { Schema, models, model } from "mongoose";

const CourseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        unique: true,
    },
    folderID: {
        type: String,
        required: true,
    },
    categoryCode: {
        type: String,
    },
});

export const Course = models.Course || model('Course', CourseSchema);