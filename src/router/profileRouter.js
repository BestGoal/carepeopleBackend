import path from 'path';
import multer from 'multer';
import routerx from "express-promise-router"
import * as profileController from "../controller/profileController";
import * as tokeMiddleware from "../middleware/index";
import config from "../../serverConf";
import ImageUploader from '../middleware/Uploader';

const Router = routerx();
const Uploader = new ImageUploader(path.join(config.DIR, "uploads/avatar"))

Router.post("/update", tokeMiddleware.check_token, multer({ storage: Uploader.storage, fileFilter: Uploader.filter }).any(), profileController.updateProfile);
 
export default Router;




