import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    required: true
  }
});

export const User = models.User || model('User', UserSchema);