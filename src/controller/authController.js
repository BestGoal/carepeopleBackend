import * as dbController from "./dbController";
import { mainUser } from "../models/index";

export const signUp = async (req, res) => {
    let fData = req.body;
    let cFlag = await dbController.bFindOne(mainUser, { email: fData.email })
    if(cFlag) {
        return res.json({ status: false, data: "this email is exist" })
    } else {
        let sFlag = await dbController.bSaveData(fData, mainUser)
        if(sFlag) {
            return res.json({ status: true, data: "Successfuly signup" })
        } else {
            return res.json({ status: false, data: "this is server error" })
        }
    }
}