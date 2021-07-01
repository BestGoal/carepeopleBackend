import * as dbController from "./dbController";
import { mainUser, sessionModel } from "../models/index";
import * as authMiddleware from "../middleware/index"

export const signin = async (req, res) => {
    let fData = req.body;
    let cFlag = await dbController.bFindOne(mainUser, { email: fData.email })
    if (cFlag) {
        let pFlag = await dbController.bFindOne(mainUser, { email: fData.email, password: fData.password })
        if (pFlag) {
            if(pFlag.permission == "admin") {
                let token = await authMiddleware.generateToken(JSON.stringify(fData));
                if(token) {
                    let sessionData = {
                        id: cFlag._id,
                        email: cFlag.email,
                        timestamp: new Date().valueOf(),
                        token
                    }
                    await dbController.bFindOneAndUpdate(sessionModel, { id: cFlag._id }, sessionData)
                    return res.json({ status: true, data: "Successfuly signin", userInfo: cFlag, token })
                } else {
                    return res.json({ status: false, data: "Please login again" })
                }
            } else {
                return res.json({ status: false, data: "Permission is denied" })
            }
        } else {
            return res.json({ status: false, data: "Password is incorrect" })
        }
    } else {
        return res.json({ status: false, data: "This email is no exist" })
    }
}