import routerx from "express-promise-router"
import * as shiftController from "../controller/worker/shiftController";
import * as tokeMiddleware from "../middleware/index";

const Router = routerx();

Router.post("/get-shift", tokeMiddleware.check_token, shiftController.getShift);
 
export default Router;