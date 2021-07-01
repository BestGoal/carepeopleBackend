import routerx from "express-promise-router"
import authRouter from "./authRouter";
import profileRouter from "./profileRouter";
import clientRouter from "./clientRouter";
import adminRouter from "./adminRouter";

const Router = routerx();

Router.use("/auth", authRouter);
Router.use("/profile", profileRouter);
Router.use("/client", clientRouter);
Router.use("/admin", adminRouter);

export default Router;