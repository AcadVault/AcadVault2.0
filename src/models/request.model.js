import MaterialSchema from './material.model';
import { Schema, models, model } from "mongoose";

const RequestSchema = new Schema({
  material: {
    type: MaterialSchema,
    required: true,
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