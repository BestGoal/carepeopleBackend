import * as dbController from "../controller/dbController"
import { shiftListModel } from "../models/index"

export const createShift = async (req, res) => {
    let data = req.body;
    data.clientid = req.user._id
    let flag = await dbController.bSaveData(data, shiftListModel)
    if(flag) {
        return res.json({ status: true, data: "Success" })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const getShift = async (req, res) => {
    let user = req.user
    let data = await dbController.bFind(shiftListModel, { clientid: user._id, status: "post" })
    if(data) {
        return res.json({ status: true, data: data })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}