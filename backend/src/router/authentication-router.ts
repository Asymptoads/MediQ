import express from 'express';

import { register, login } from '../controllers/authentication-controllers';

const authenticationRouter = (router: express.Router) => {
    router.post('/api/auth/register', register);
    router.post('/api/auth/login', login);
};

export default authenticationRouter;
