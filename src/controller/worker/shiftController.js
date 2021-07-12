import { shiftListModel } from "../../models/index"
import * as dbController from "../dbController"
import mongoose from 'mongoose';

export const getShift = async (req, res) => {
    let user = req.user
    let count = req.body.count

    let data = await shiftListModel.aggregate([
        {
            $match: {
                $and: [
                    {
                        job_position: Number(user.jobPosition),
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
        },
        {
            $lookup: {
                from: "user_users",
                localField: "clientid",
                foreignField: "_id",
                as: "clientData"
            }
        },
        {
            $unwind: "$clientData"
        },
    ])
    if (data) {
        return res.json({ status: true, data: data })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const acceptShift = async (req, res) => {
    let shift = req.body;
    let flag = await dbController.bFindOneAndUpdate(
        shiftListModel,
        { _id: shift._id },
        { worker: mongoose.Types.ObjectId(req.user._id), status: 'schedule' }
    )
    if (flag) {
        return res.json({ status: true, data: "Success" })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const getCurrentShift = async (req, res) => {
    let data = await shiftListModel.aggregate([
        {
            $match: {
                $and: [
                    {
                        worker: mongoose.Types.ObjectId(req.user._id),
                        status: "schedule"
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "user_users",
                localField: "clientid",
                foreignField: "_id",
                as: "clientData"
            }
        },
        {
            $unwind: "$clientData"
        },
    ])
    if (data) {
        return res.json({ status: true, data: data })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const cancelShift = async (req, res) => {
    let { id } = req.body
    let shift = await dbController.bFindOne(shiftListModel, { _id: id });
    if (shift) {
        let blockWorkers = shift.block_workers;
        blockWorkers[shift.worker] = true
        let flag = await dbController.bFindOneAndUpdate(shiftListModel, { _id: id, worker: req.user._id }, { status: "post", worker: null, block_workers: blockWorkers })
        if (flag) {
            return getCurrentShift(req, res)
        } else {
            return res.json({ status: false, data: "Failure" })
        }
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const clickIn = async (req, res) => {
    let { id } = req.body;
    let shift = await dbController.bFindOne(shiftListModel, { _id: id });
    for (let i = 0; i < shift.date.length; i++) {
        let date = shift.date[i]
        if (!date.isFinish) {
            date.startTime = new Date().valueOf();
            date.time = 0;
            date.isFinish = false;
            shift.date[i] = date;
            break;
        }
    }
    let flag = await dbController.bFindOneAndUpdate(shiftListModel, { _id: id }, { date: shift.date, status: "inprogress" })
    if (flag) {
        return res.json({ status: true, data: "Success" })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const getProgresShift = async (req, res) => {
    let data = await shiftListModel.aggregate([
        {
            $match: {
                $and: [
                    {
                        worker: mongoose.Types.ObjectId(req.user._id),
                        status: "inprogress"
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "user_users",
                localField: "clientid",
                foreignField: "_id",
                as: "clientData"
            }
        },
        {
            $unwind: "$clientData"
        },
    ])
    
    for (let i = 0; i < data.length; i++) {
        for(let j = 0 ; j < data[i].date.length ; j ++) {
            if(!data[i].date[j].isFinish) {
                let timeMinute = Math.round((new Date().valueOf() - data[i].date[j].startTime) / 60000)
                let cMinute = timeMinute % 60
                let cHour = String(timeMinute / 60).split(".")[0]
                data[i].date[j].currentTime = cHour + ":" + cMinute
            }
        }
    }
    
    if (data) {
        return res.json({ status: true, data: data })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}

export const clickOut = async (req, res) => {
    let { id } = req.body;
    let shift = await dbController.bFindOne(shiftListModel, { _id: id });
    let fFlag = false;
    for (let i = 0; i < shift.date.length; i++) {
        let date = shift.date[i]
        if (!date.isFinish) {
            date.time = Math.round((new Date().valueOf() - date.startTime) / 60000)
            date.isFinish = true;
            shift.date[i] = date;
            if(shift.date.length - 1 == i) {
                fFlag = true
            }
            break;
        }
    }
    let flag = false;
    if(fFlag) {
        flag = await dbController.bFindOneAndUpdate(shiftListModel, { _id: id }, { date: shift.date, status: "finished" })
    } else {
        flag = await dbController.bFindOneAndUpdate(shiftListModel, { _id: id }, { date: shift.date, status: "schedule" })
    }
    if (flag) {
        return res.json({ status: true, data: "Success" })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}