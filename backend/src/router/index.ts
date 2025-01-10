// routes/index.ts
import express from 'express';
import authenticationRouter from './authentication-router';
import userRouter from './user-router';
import queueRouter from './queue-router';
// import userRouter from './user-in-queue-router';

const router = express.Router();

export default (): express.Router => {
    authenticationRouter(router);
    userRouter(router);
    return router;
};
