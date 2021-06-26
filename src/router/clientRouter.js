import routerx from "express-promise-router"
import * as shiftController from "../controller/shiftController";
import * as tokeMiddleware from "../middleware/index";

const Router = routerx();

Router.post("/create-shift", tokeMiddleware.check_token, shiftController.createShift);
 
export default Router;