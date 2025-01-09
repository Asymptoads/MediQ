// middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secret } from '../envconfig';
import  {userModel}  from '../models/user.model';

export const isAuthenticated = async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
) => {
    try {
        // Check for Authorization header first, then cookie
        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies.jwt_token;
        
        let token;
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (cookieToken) {
            token = cookieToken;
        }

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, secret) as { id: string };
        
        // Verify user exists
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = { id: decoded.id };
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
