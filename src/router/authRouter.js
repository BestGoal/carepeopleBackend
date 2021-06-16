import routerx from "express-promise-router"
import * as authController from "../controller/authController";

const Router = routerx();

Router.post("/signup", authController.signUp);
Router.post("/signin", authController.signIn);
 
export default Router;