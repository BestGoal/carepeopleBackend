import jsonwebtoken from "jsonwebtoken";
import * as dbController from "../controller/dbController";
import { sessionModel, mainUser } from "../models/index";

export const check_token = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        let sessionData = await dbController.bFindOne(sessionModel, { token });
        let thisTime = new Date().valueOf();
        if (sessionData) {
            if ((sessionData.timestamp * 1) + (60 * 20 * 1000) < thisTime) {
                await dbController.bFindOneAndDelete(sessionModel, { token });
                return res.json({ status: false, data: "Session expired", isSession: true });
            } else {
                await dbController.bFindOneAndUpdate(sessionModel, { token }, { timestamp: thisTime });
                let user = await dbController.bFindOne(mainUser, { _id: sessionData.id });
                req.user = user;
                next()
            }
        } else {
            return res.json({ status: false, message: "Session expired", isSession: true });
        }
    } catch (e) {
        next();
    }
}

export const generateToken = async function (data) {
    try {
        console.log(data)
        let token = jsonwebtoken.sign(data, String(new Date().valueOf()));
        return token;
    } catch (e) {
        console.log(e)
        return false;
    }
}