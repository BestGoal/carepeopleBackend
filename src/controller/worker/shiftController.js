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
                        $or: [
                            {
                                status: "post"
                            },
                            {
                                status: "mcschedule"
                            }
                        ]

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
        { worker: mongoose.Types.ObjectId(req.user._id), status: 'schedule'}
    )
    if(flag) {
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
