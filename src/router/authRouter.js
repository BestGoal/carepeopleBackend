import routerx from "express-promise-router"
import * as authController from "../controller/authController";

const Router = routerx();

Router.post("/signup", authController.signUp);
 
export default Router;