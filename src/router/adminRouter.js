import routerx from "express-promise-router"
import * as adminController from "../controller/adminController";
import * as tokeMiddleware from "../middleware/index";

const Router = routerx();

Router.post("/getAllClients", tokeMiddleware.check_token, adminController.getAllClients);
Router.post("/updateClient", tokeMiddleware.check_token, adminController.updateClient);
Router.post("/getAllWorker", tokeMiddleware.check_token, adminController.getAllWorker);
Router.post("/updateWorkers", tokeMiddleware.check_token, adminController.updateWorkers);
 
export default Router;