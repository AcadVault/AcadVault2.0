import { ObjectId } from "mongodb";
import { Schema, models, model } from "mongoose";

const AccountSchema = new Schema({
    providerAccountId: {
        type: String,
        required: true,
    },
    access_token: {
        type: String,
        required: true,
    },
    expires_at: {
        type: Number,
        required: true,
    },
    scope: {
        type: String,
    },
    id_token: {
        type: String,
        required: true,
    },
    userId: {
        type: ObjectId,
        required: true,
    },
});

export const Account = models.Account || model('Account', AccountSchema);