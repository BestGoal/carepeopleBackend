import jsonwebtoken from "jsonwebtoken";
// import * as dbController from "../controller/baseController/dbController";
// import * as providerController from "../controller/baseController/providerController";
// import { userSession, mainUser, playUser } from "../models/index";
import config from "../../serverConf";

export const check_token = async (req, res, next) => {
    // let token = req.headers.authorization;
    // try {
    //     let sessionData = await dbController.bFindOne(userSession, { token });
    //     let thisTime = new Date().valueOf();
    //     if (sessionData) {
    //         if ((sessionData.timestamp * 1) + config.session.expiretime < thisTime) {
    //             await dbController.bFindOneAndDelete(userSession, { token });
    //             return res.json({ status: false, message: "Session expired", isSession: true });
    //         } else {
    //             await dbController.bFindOneAndUpdate(userSession, { token }, { timestamp: thisTime });
    //             let user = await dbController.bFindOne(mainUser, { _id: sessionData.id });
    //             let player = await dbController.bFindOne(playUser, { id: sessionData.id });
    //             req.user = user;
    //             req.player = player;
    //             check_permission(req, res, next);
    //         }
    //     } else {
    //         return res.json({ status: false, message: "Session expired", isSession: true });
    //     }
    // } catch (e) {
        next();
    // }
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