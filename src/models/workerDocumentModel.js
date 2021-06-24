import mongoose from 'mongoose';
import tblConfig from "../config/tablemanage";

const workerDocumentSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    documentId: {
        type: Number,
        required: true,
    },
    document: {
        type: Array,
        default: []
    }
});

export const workerDocument = mongoose.model(tblConfig.workerDOcument, workerDocumentSchema);