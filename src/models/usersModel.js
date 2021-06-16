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
    apartNumber: {
        type: String,
        default: ""
    },
    jobPosition: {
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
    streetNumber: {
        type: String,
        default: ""
    },
    streetName: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    province: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    zipcode: {
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
        default: ""
    },
    password: {
        type: String,
        required: true,
    },    
    companyDescription: {
        type: String,
        default: ""
    },
    permission: {
        type: String,
        required: true,
    }
});

export const mainUser = mongoose.model(tblConfig.mainuser, mainSchema);