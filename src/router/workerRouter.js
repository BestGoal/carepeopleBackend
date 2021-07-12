import routerx from "express-promise-router"
import * as shiftController from "../controller/worker/shiftController";
import * as tokeMiddleware from "../middleware/index";

const Router = routerx();

Router.post("/get-shift", tokeMiddleware.check_token, shiftController.getShift);
Router.post("/accept-shift", tokeMiddleware.check_token, shiftController.acceptShift);
Router.post("/get-current-shift", tokeMiddleware.check_token, shiftController.getCurrentShift);
Router.post("/cancel-shift", tokeMiddleware.check_token, shiftController.cancelShift);
Router.post("/click-in", tokeMiddleware.check_token, shiftController.clickIn);
Router.post("/get-progress-shift", tokeMiddleware.check_token, shiftController.getProgresShift);
Router.post("/click-out", tokeMiddleware.check_token, shiftController.clickOut);

export default Router;