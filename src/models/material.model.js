import { Schema, models, model } from "mongoose";

const MaterialSchema = new Schema({
  fileID: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  // comments:{
  //   type:[String]
  // }
});

export const Material = models.Material || model('Material', MaterialSchema);