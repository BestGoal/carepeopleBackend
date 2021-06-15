import routerx from "express-promise-router"
import authRouter from "./authRouter";

const Router = routerx();

Router.use("/auth", authRouter);

export default Router;