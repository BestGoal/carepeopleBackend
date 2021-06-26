import routerx from "express-promise-router"
import authRouter from "./authRouter";
import profileRouter from "./profileRouter";
import clientRouter from "./clientRouter";

const Router = routerx();

Router.use("/auth", authRouter);
Router.use("/profile", profileRouter);
Router.use("/client", clientRouter);

export default Router;