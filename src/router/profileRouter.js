import path from 'path';
import multer from 'multer';
import routerx from "express-promise-router"
import * as profileController from "../controller/profileController";
import * as tokenMiddleware from "../middleware/index";
import config from "../../serverConf";
import ImageUploader from '../middleware/Uploader';

const Router = routerx();
const avatarUploader = new ImageUploader(path.join(config.DIR, "uploads/avatar"))
const documentUploader = new ImageUploader(path.join(config.DIR, "uploads/document"))

Router.post("/update", tokenMiddleware.check_token, multer({ storage: avatarUploader.storage, fileFilter: avatarUploader.filter }).any(), profileController.updateProfile);
Router.get("/document", tokenMiddleware.check_token, profileController.getDocument);
Router.get("/document/download", tokenMiddleware.check_token, profileController.downloadDocument);
Router.get("/document/:id", tokenMiddleware.check_token, profileController.getDocumentWithId);
Router.delete("/document", tokenMiddleware.check_token, profileController.deleteDocument);
Router.post("/document", tokenMiddleware.check_token, multer({ storage: documentUploader.storage, fileFilter: documentUploader.filter }).any(), profileController.addDocument);

export default Router;