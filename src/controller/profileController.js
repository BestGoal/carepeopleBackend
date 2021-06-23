import fs from 'fs';
import * as dbController from "./dbController";
import { mainUser } from "../models/index";
import config from "../../serverConf"

export const updateProfile = async (req, res) => {
    let { id, data } = req.body;
    data = JSON.parse(data);
    if(req.files.length) {
        data.avatar = "avatar/" + req.files[0].filename;
    }
    let cUser = await dbController.bFindOne(mainUser, { _id: id });
    if(cUser) {
        if(cUser.avatar && cUser.avatar != "avatar/avatar.webp") {
            await fs.unlink(config.DIR + "/uploads/" + cUser.avatar, async (err) => { })
        }
        let flag = await dbController.bFindOneAndUpdate(mainUser, { _id: id }, data);
        if(flag) {
            return res.json({ status: true, data: "Success", userInfo: flag })
        } else {
            return res.json({ status: true, data: "Failure" })
        }
    } else {
        return res.json({ status: true, data: "Failure" })        
    }
}