import routerx from "express-promise-router"
import authRouter from "./authRouter";
import profileRouter from "./profileRouter";

const Router = routerx();

Router.use("/auth", authRouter);
Router.use("/profile", profileRouter);

export default Router;