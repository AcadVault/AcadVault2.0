import { Schema, models, model } from "mongoose";

const MaterialSchema = new Schema({
  fileID: {
    type: String,
    required: true,
    unique: true,
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
  }
});

export const Material = models.Material || model('Material', MaterialSchema);
export default MaterialSchema;