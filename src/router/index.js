import routerx from "express-promise-router"
import authRouter from "./authRouter";
import profileRouter from "./profileRouter";
import adminRouter from "./adminRouter";
import clientRouter from "./clientRouter";
import workerRouter from "./workerRouter";

const Router = routerx();

Router.use("/auth", authRouter);
Router.use("/profile", profileRouter);
Router.use("/admin", adminRouter);
Router.use("/client", clientRouter);
Router.use("/worker", workerRouter);

export default Router;