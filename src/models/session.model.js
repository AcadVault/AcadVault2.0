import { ObjectId } from "mongodb";
import { Schema, models, model } from "mongoose";

const SessionSchema = new Schema({
  sessionToken: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  expires: {
    type: Date,
    required: true
  }
});

export const Session = models.Session || model('Session', SessionSchema);