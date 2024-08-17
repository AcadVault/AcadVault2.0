import { Schema, models, model } from "mongoose";

const RequestSchema = new Schema({
    material: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: function () { return this.status === 'APPROVED' ? 'ApprovedMaterial' : 'UnapprovedMaterial'; }
    },
    studentID: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const Request = models.Request || model('Request', RequestSchema);