import * as dbController from "../dbController"
import { shiftListModel } from "../../models/index"

export const createShift = async (req, res) => {
    let data = req.body;
    data.clientid = req.user._id
    let flag = await dbController.bSaveData(data, shiftListModel)
    if (flag) {
        return res.json({ status: true, data: "Success" })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const getShift = async (req, res) => {
    let user = req.user
    let count = req.body.count
    let data = await shiftListModel.aggregate([
        {
            $match: {
                $and: [
                    {
                        clientid: user._id, status: "post"
                    }
                ]
            }
        },
        {
            $skip: 0
        },
        {
            $limit: count
        }
    ])
    if (data) {
        return res.json({ status: true, data: data })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const removeShift = async (req, res) => {
    let { id } = req.body
    let flag = await dbController.bFindOneAndUpdate(shiftListModel, { _id: id }, { status: "removed" })
    if(flag) {
        return getShift(req, res)
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}