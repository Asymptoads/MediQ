// routes/user-router.ts
import express from 'express';
import {
    deleteUser,
    getAllUsers,
    getCurrentUser,
    updateUser,
} from '../controllers/user-controllers';
import { isAuthenticated } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/api/user', isAuthenticated, getCurrentUser);
    router.get('/api/users', isAuthenticated, getAllUsers);
    router.put('/api/user/update', isAuthenticated, updateUser);
    router.delete('/api/user/delete', isAuthenticated, deleteUser);
};
