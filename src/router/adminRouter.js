import routerx from "express-promise-router"
import * as adminController from "../controller/adminController";
// import * as tokeMiddleware from "../middleware/index";

const Router = routerx();

Router.post("/signin", adminController.signin);
 
export default Router;