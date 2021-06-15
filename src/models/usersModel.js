import mongoose from 'mongoose';
import tblConfig from "../config/tablemanage";

const mainSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    companyName: {
        type: String,
        default: ""
    },
    companyWebsite: {
        type: String,
        default: ""
    },
    companyType: {
        type: String,
        default: ""
    },
    companyDescription: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    permission: {
        type: String,
        required: true,
    }
});

export const mainUser = mongoose.model(tblConfig.mainuser, mainSchema);