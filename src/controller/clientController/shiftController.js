import mongoose from 'mongoose';
import * as dbController from "../dbController"
import { shiftListModel } from "../../models/index"

export const createShift = async (req, res) => {
    let data = req.body;
    data.clientid = mongoose.Types.ObjectId(req.user._id)
    let flag = true;

    console.log(data)

    for(let i = 0 ; i < data.vacancies; i ++) {
        flag = await dbController.bSaveData(data, shiftListModel)
    }
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
                        clientid: user._id, 
                        status: "post"
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

export const getCurrentShift = async (req, res) => {
    let user = req.user
    let data = await shiftListModel.aggregate([
        {
            $match: {
                $and: [
                    {
                        clientid: mongoose.Types.ObjectId(user._id), 
                        status: "schedule"
                    }
                ]
            }
        }
    ])
    if (data) {
        return res.json({ status: true, data: data })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const cancelCurrentShift = async (req, res) => {
    let { id } = req.body
    let shift = await dbController.bFindOne(shiftListModel, { _id: id });
    if(shift) {
        let blockWorkers = shift.block_workers;
        blockWorkers.push(shift.worker)
        let flag = await dbController.bFindOneAndUpdate(shiftListModel, { _id: id }, { status: "post", worker: null, block_workers: blockWorkers })
        if(flag) {
            return getCurrentShift(req, res)
        } else {
            return res.json({ status: false, data: "Failure" })
        }
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}