import express from "express";
import authenticationRouter from "./authentication-router";
import userRouter from "./user-router";
import queueRouter from "./queue-router";
import appointmentRouter from "./appointment-router";
import predictionRouter from "./prediction-router";

const router = express.Router();

export default (): express.Router => {
    authenticationRouter(router);
    userRouter(router);
    queueRouter(router);
    appointmentRouter(router);
    predictionRouter(router); // Call with the correct number of arguments
    return router;
};
