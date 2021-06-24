import fs from 'fs';
import url from 'url';
import * as dbController from "./dbController";
import { mainUser, workerDocument } from "../models/index";
import config from "../../serverConf"

export const updateProfile = async (req, res) => {
    let { id, data } = req.body;
    data = JSON.parse(data);
    let cUser = await dbController.bFindOne(mainUser, { _id: id });
    if (cUser) {
        if (req.files.length) {
            data.avatar = "avatar/" + req.files[0].filename;
            if (cUser.avatar && cUser.avatar != "avatar/avatar.webp") {
                await fs.unlink(config.DIR + "/uploads/" + cUser.avatar, async (err) => { })
            }
        }
        let flag = await dbController.bFindOneAndUpdate(mainUser, { _id: id }, data);
        if (flag) {
            return res.json({ status: true, data: "Success", userInfo: flag })
        } else {
            return res.json({ status: true, data: "Failure" })
        }
    } else {
        return res.json({ status: true, data: "Failure" })
    }
}

export const getDocument = async (req, res) => {
    let userData = req.user
    let documentData = await dbController.bFind(workerDocument, { id: userData._id })
    if (documentData) {
        return res.json({ status: true, data: documentData })
    } else {
        return res.json({ status: true, data: [] })
    }
}

export const getDocumentWithId = async (req, res) => {
    let id = req.params.id
    if(id) {
        let userData = req.user
        let documentData = await dbController.bFindOne(workerDocument, { id: userData._id, documentId: id })
        if (documentData) {
            return res.json({ status: true, data: documentData })
        } else {
            return res.json({ status: true, data: {} })
        }
    } else {
        return res.json({ status: true, data: {} })
    }
}

export const deleteDocument = async (req, res) => {
    let { url, documentId } = req.body
    if(url) {
        let userData = req.user
        let documentData = await dbController.bFindOne(workerDocument, { id: userData._id, documentId })
        if (documentData) {
            let document = documentData.document;
            let newDocument = [];
            for(let i = 0 ; i < document.length ; i ++) {
                if(url != document[i].url) {
                    newDocument.push(document[i])
                } else {
                    await fs.unlink(config.DIR + "/uploads/" + url, async (err) => { })
                }
            }
            let updateDocument = await dbController.bFindOneAndUpdate(workerDocument, { id: userData._id, documentId }, { document: newDocument });
            if(updateDocument) {
                return res.json({ status: true, data: updateDocument })
            } else {
                return res.json({ status: false, data: "Failure" })
            }
        } else {
            return res.json({ status: false, data: "Failure2" })
        }
    } else {
        return res.json({ status: false, data: "Failure3" })
    }
}

export const addDocument = async (req, res) => {
    if (req.files[0]) {
        let document = req.files[0]
        let userDocumentData = await dbController.bFindOne(workerDocument, { id: req.user._id, documentId: req.body.id });
        let flag = false;
        if (userDocumentData) {
            let userDocument = userDocumentData.document;
            userDocument.push({
                fileName: document.originalname,
                url: "/document/" + document.filename
            })
            flag = await dbController.bFindOneAndUpdate(workerDocument, { id: req.user._id, documentId: req.body.id }, { document: userDocument })
        } else {
            let saveData = {
                id: req.user._id,
                documentId: req.body.id,
                document: [{
                    fileName: document.originalname,
                    url: "/document/" + document.filename
                }]
            }
            flag = await dbController.bSaveData(saveData, workerDocument);
        }
        if(flag) {
            getDocument(req, res)
        } else {
            return res.json({ status: false, data: "Failure" })
        }
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}