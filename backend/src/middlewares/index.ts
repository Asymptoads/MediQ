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
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.jwt_token;
    let token;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      return res.status(401).json({ message: "Authentication token required" });
    }

    const decoded = jwt.verify(token, secret) as { id: string };

    // Check if the user exists
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: decoded.id }; // Attach user info to the request
    next(); // Call the next middleware
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
