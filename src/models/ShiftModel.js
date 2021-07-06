import mongoose from 'mongoose';
import tblConfig from "../config/tablemanage";

const mainSchema = new mongoose.Schema({
    clientid: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    job_position: {
        type: Number,
        required: true
    },
    vacancies: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    duty: {
        type: Number,
        required: true
    },
    covid: {
        type: Number,
        required: true
    },
    dateType: {
        type: Boolean,
        required: true
    },
    date: {
        type: Array,
        required: true
    },
    note: {
        type: String,
        default: ""
    },
    eventName: {
        type: String,
        default: ""
    },
    unpaid_break: {
        type: Number,
        required: true
    },
    transit_allowance: {
        type: Number,
        required: true
    },
    address: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: "post" //post, inprogress, finished, removed
    },
    workers: {
        type: Array,
        required: true
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export const shiftListModel = mongoose.model(tblConfig.shiftlist, mainSchema);