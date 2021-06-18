import mongoose from 'mongoose';
import tblConfig from "../config/tablemanage";

const mainSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Number,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    socketid: {
        type: String,
        default: "",
    },
});

export const sessionModel = mongoose.model(tblConfig.sessionuser, mainSchema);