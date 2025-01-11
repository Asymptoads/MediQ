// routes/index.ts
import express from "express";
import authenticationRouter from "./authentication-router";
import userRouter from "./user-router";
import queueRouter from "./queue-router";
import appointmentrouter from "./appointment-router";

const router = express.Router();

export default (): express.Router => {
    authenticationRouter(router);
    userRouter(router);
    queueRouter(router);
    appointmentrouter(router);
    return router;
};
