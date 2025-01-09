import express from 'express';
import authenticationRouter from './authentication-router';
import userRouter from './user-router';

const router = express.Router();

export default (): express.Router => {
    authenticationRouter(router);
    userRouter(router);
    return router;
};
