import { Schema, models, model } from "mongoose";

const PathSchema = new Schema({
  course: {
    type: String,
    required: true,
    unique: true,
  },
  folderID: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Path = models.Path || model('Path', PathSchema);