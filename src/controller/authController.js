import * as dbController from "./dbController";
import { mainUser, sessionModel } from "../models/index";
import * as authMiddleware from "../middleware/index"

export const signUp = async (req, res) => {
    let fData = req.body;
    let cFlag = await dbController.bFindOne(mainUser, { email: fData.email })
    if (cFlag) {
        return res.json({ status: false, data: "this email is exist" })
    } else {
        let sFlag = await dbController.bSaveData(fData, mainUser)
        if (sFlag) {
            let token = await authMiddleware.generateToken("JSON.stringify(fData)");
            if(token) {
                let sessionData = {
                    id: sFlag._id,
                    email: sFlag.email,
                    timestamp: new Date().valueOf(),
                    token
                }
                await dbController.bFindOneAndUpdate(sessionModel, { id: sFlag._id }, sessionData)
                return res.json({ status: true, data: "Successfuly signup", userInfo: sFlag, token })
            } else {
                return res.json({ status: false, data: "Please login again" })
            }
        } else {
            return res.json({ status: false, data: "this is server error" })
        }
    }
}

export const signIn = async (req, res) => {
    let fData = req.body;
    let cFlag = await dbController.bFindOne(mainUser, { email: fData.email })
    if (cFlag) {
        let pFlag = await dbController.bFindOne(mainUser, { email: fData.email, password: fData.password })
        if (pFlag) {
            return res.json({ status: true, data: "Success", userInfo: pFlag })
        } else {
            return res.json({ status: false, data: "Password is incorrect" })
        }
    } else {
        return res.json({ status: false, data: "This email is no exist" })
    }
}