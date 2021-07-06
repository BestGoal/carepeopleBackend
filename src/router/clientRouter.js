import routerx from "express-promise-router"
import * as shiftController from "../controller/clientController/shiftController";
import * as tokeMiddleware from "../middleware/index";

const Router = routerx();

Router.post("/create-shift", tokeMiddleware.check_token, shiftController.createShift);
Router.post("/get-shift", tokeMiddleware.check_token, shiftController.getShift);
Router.post("/remove-shift", tokeMiddleware.check_token, shiftController.removeShift);
 
export default Router;