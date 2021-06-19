import routerx from "express-promise-router"
import * as authController from "../controller/authController";
import * as tokeMiddleware from "../middleware/index";

const Router = routerx();

Router.post("/signup", authController.signUp);
Router.post("/signin", authController.signIn);
Router.get("/sessionCheck",  tokeMiddleware.check_token, authController.sessionCheck);
 
export default Router;