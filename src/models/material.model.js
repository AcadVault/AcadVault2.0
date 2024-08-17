import { Schema, models, model } from "mongoose";

const MaterialSchema = new Schema({
    fileID: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    materialType: {
        type: String,
        required: true,
    },
    exam: {
        type: String,
    },
    number: {
        type: Number,
    },
    year: {
        type: Number,
    },
    referenceBookName: {
        type: String,
    },
    approvedBy: {
        type: String,
    },
}, { timestamps: true });

export const UnapprovedMaterial = models.UnapprovedMaterial || model('UnapprovedMaterial', MaterialSchema);
export const ApprovedMaterial = models.ApprovedMaterial || model('ApprovedMaterial', MaterialSchema);
export default MaterialSchema;