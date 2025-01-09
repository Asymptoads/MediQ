import express from 'express';

import {
    deleteUser,
    getAllUsers,
    getCurrentUser,
    updateUser,
} from '../controllers/user-controllers';

import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/api/user', isAuthenticated, getCurrentUser);
    router.get('/api/users', isAuthenticated, getAllUsers);
};
